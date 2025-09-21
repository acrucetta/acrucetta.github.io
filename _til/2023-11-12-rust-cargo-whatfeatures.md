---
title: "Listing activated Cargo features"
date: 2023-11-12
tags: [rust]
---

`cargo tree -e features` shows which features are enabled (and why) across the dependency graph. It's a much quicker way to spot accidental feature activations than digging through `Cargo.lock`.

I also learned you can scope it to a single crate:

```sh
cargo tree -p serde --edges features
```

The output highlights feature origins, so tracking down unexpected dependencies is way less tedious.
