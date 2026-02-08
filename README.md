TODO
- Add syntax highlighting to the blog posts
- Add support for Latex
- Clean up article titles
- Keep only blog posts in the website; move references to wiki

## TIL CLI

Use `scripts/til` to create a new TIL entry from any directory:

```bash
scripts/til "Your TIL title"
scripts/til -t postgres,sql "CTE optimization gotcha"
```

To make it available globally as `til`:

```bash
mkdir -p "$HOME/bin"
ln -sf "$PWD/scripts/til" "$HOME/bin/til"
```

Then ensure `$HOME/bin` is in your shell `PATH`.

For fish:

```fish
if not contains "$HOME/bin" $fish_user_paths
    set -U fish_user_paths "$HOME/bin" $fish_user_paths
end
```
