import React from "react";
import { Feed } from "../../models/feed";

interface FeedProps {
  feed: Feed;
}

const FeedShow = ({ feed }: FeedProps) => {
  return (
    <div>
      <h1>Feed</h1>
      <table>
        <tbody>
          <tr>
            <th>ID</th>
            <td>{feed.id}</td>
          </tr>
          <tr>
            <th>Name</th>
            <td>{feed.name}</td>
          </tr>
          <tr>
            <th>Feed Code</th>
            <td>{feed.feed_code}</td>
          </tr>
          {feed.feed_filters.map(filter => {
            return <tr key={filter.id}>
              <th>Filter</th>
              <td>{JSON.stringify(filter)}</td>
            </tr>;
          })}
        </tbody>
      </table>
    </div>
  );
};

export default FeedShow;
