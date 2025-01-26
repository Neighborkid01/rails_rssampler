import React from "react";
import { Feed } from "../../models/feed";

interface FeedsProps {
  feeds: Feed[];
}

export default function Feeds({feeds}: FeedsProps) {
  return (
    <div>
      <h1>Feeds</h1>
      <table>
        <thead>
          <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Feed Code</th>
          </tr>
        </thead>
        <tbody>
          {feeds.map(feed => (
            <tr key={feed.id}>
              <td>{feed.id}</td>
              <td>{feed.name}</td>
              <td>{feed.feedCode}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
