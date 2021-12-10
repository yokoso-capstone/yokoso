# Firebase Configuration

## Firestore Indexes

[Firestore index definition](https://firebase.google.com/docs/reference/firestore/indexes/) is specified and deployed through [firestore.indexes.json](firestore.indexes.json).
For convenience, they can be created through the Firebase console UI and then exported to JSON.

```
firebase firestore:indexes > firestore.indexes.json
```

### Index Merging

[Take advantage of index merging](https://firebase.google.com/docs/firestore/query-data/index-overview#taking_advantage_of_index_merging) by using Firestore's ability to merge indexes for equality clauses.
