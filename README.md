# Create T3 App

This is a [T3 Stack](https://create.t3.gg/) project bootstrapped with `create-t3-app`.

api.useUtils() is a TRPC hook used to access utility functions provided by the TRPC client. These utilities allow you to manually trigger certain actions, such as:

- Invalidating Queries: This forces a refetch of specific data to ensure the UI reflects the latest state after a mutation.
- Refetching Queries: This can refetch data without needing to rely on automatic refetches.
- Setting Query Data: This allows manual updating of cached query data without refetching from the server.
  In your case, you use api.useUtils() to get the utils object, which contains methods like invalidate. For example, after performing a mutation (such as creating, updating, or deleting a topic), you call utils.topic.invalidate() to invalidate the cached getAll query, ensuring that the updated data is refetched from the server and displayed in the UI.

`Key Utilities Provided:`

`invalidate():` Invalidates the cache for specific queries, forcing them to be refetched the next time they are used.
`refetch():` Manually refetches a query without needing to invalidate it.
`setData():` Manually updates the cached data for a query without refetching.
This mechanism helps keep your data in sync after mutations without the need for full-page reloads.
