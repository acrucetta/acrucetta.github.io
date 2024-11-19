

## Raft 

### Consensus

A consensus algorithm to maintain state across distributed nodes.

What is consensus?
- Several nodes need to agree on a single value. 
- Consesus guarantees that once people decide, all nodes will deliver the same
  order
- Consensus and total order broadcast are similar

Some example of consensus algorithms:
- Paxos, Raft, Multi-Paxos

Paxos, Raft assume a partially synchronous crash-recovery system. Most of the
time the network will be well-behaved. It's impossible to make a system in an
async system in such a way that the algorithm will be terminate.

These algorithms use clocks for timeouts/failure detection. The correctness
doesn't depend on timing.

There are byzantine (some aggressive nodes) system models (used in blockchains). 

### Raft 

#### Key Terms

**Current term**: It's hard to sync time across the instances, so we use a term that keeps incrementing monotonically. We increment it when the current term times out and we start a new election. If any of our peers is out of tune, we match the term to the one they received and they become followers (Figure 2)

**Commit index**: is the highest log entry known to be committed across all servers.

**Last applied**: is the highest log entry known to be applied, it resets to 0 if the node fails. We assumed all entries were wiped and need to be re-applied.

**Next index** is a guess as to what prefix the leader shares with ha given follower. It is optimistic. Only moves backwards with a failure

**Match index**: is used for safety. It is the index of the highest log entry known to be *replicated*. i.e., what prefix of the log the leader shares with a given follower. It's initialized to -1, it's updated when the follower acknowledge the entry.

**Applied vs. Committed**: any log entry that has been applied to the state machine is "applied". An entry should never be applied unless it has been committed. An entry could be committed, but not yet applied.

Request terms:

Append Entries (replicate the leader's logs or heartbeats)
- Prev Log Index: index of log entry before the new ones
- Prev Log Term: term of the prev log index
- Leader Commit: leader's commit index (highest log entry it thinks you have committed)

Request Vote (gather votes)
- ...

#### Data Structure

```go
type Raft struct {
	mu        sync.Mutex
	peers     []*labrpc.ClientEnd
	persister *Persister
	me        int
	dead      int32

	// Persistent state on all servers
	currentTerm int
	votedFor    int
	log         []LogEntry
	state       ServerState

	// Volatile state on all servers
	commitIndex int // Highest log entry known to be committed
	lastApplied int // last entry known to be applied, resets at 0

	// Volatile state on leaders
	// For each server, index of the next log entry to send to that server
	nextIndex []int
	// For each server, index of highest log entry known to
	// be replicated on server
	matchIndex []int

	// Channels for coordination
	electionTimer     *time.Timer
	lastElectionReset time.Time
	applyCh           chan ApplyMsg
}  
```

