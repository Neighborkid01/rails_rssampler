require "uri"
require "net/http"
require "socket"

class RedirectError < StandardError; end

class RssUrlValidator
  def initialize(url)
    @url = url
  end

  def valid?
    return false unless valid_url?

    safe_url = follow_redirects(@url)
    return false unless safe_host?(safe_url)
    return false unless valid_rss_feed?(safe_url)

    true
  end

  private

  def valid_url?
    uri = URI.parse(@url)
    uri.is_a?(URI::HTTP) || uri.is_a?(URI::HTTPS)
  rescue URI::InvalidURIError
    false
  end

  def safe_host?(url)
    uri = URI.parse(url)
    addr = Addrinfo.getaddrinfo(uri.host, nil).map(&:ip_address)
    addr.none? { |ip| private_ip?(ip) }
  rescue SocketError, URI::InvalidURIError
    false
  end

  def private_ip?(ip)
    ip.start_with?("127.", "10.", "192.168.", "169.254.", "::1") ||
      ip.match?(/^172\.(1[6-9]|2[0-9]|3[0-1])\./) # 172.16.0.0 - 172.31.255.255
  end

  def follow_redirects(url, limit = 5)
    raise "Too many redirects" if limit == 0

    uri = URI.parse(url)
    response = Net::HTTP.start(uri.host, uri.port, use_ssl: uri.scheme == "https", read_timeout: 5, open_timeout: 5) do |http|
      http.get(uri.request_uri)
    end

    case response
    when Net::HTTPRedirection
      follow_redirects(response["location"], limit - 1)
    else
      uri.to_s
    end
  rescue Net::OpenTimeout
    raise RedirectError, "Connection timed out - invalid URL"
  rescue StandardError => e
    raise RedirectError, "Failed to follow redirect: #{e.message}"
  end

  def valid_rss_feed?(url)
    uri = URI.parse(url)
    response = Net::HTTP.start(uri.host, uri.port, use_ssl: uri.scheme == "https") do |http|
      http.head(uri.request_uri)
    end

    content_type = response["content-type"]
    content_type&.include?("xml") || content_type&.include?("rss")
  rescue StandardError
    false
  end
end
