

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




