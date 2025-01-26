import React from "react";
import { Feed } from "../../models/feed";

interface FeedProps {
  feed: Feed;
}

export default function FeedShow({feed}: FeedProps) {
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
            <td>{feed.feedCode}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
