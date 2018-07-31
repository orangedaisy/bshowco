---
layout: post
title: "Alias Git for Your Benefit, Not the Computer's"
---

I'm a huge fan of Git, and use it on both professional and personal projects.
One of the hardest things to remember as a new user&mdash;or, heck, even a
long-time user&mdash;is all of Git's various commands and their permutations. A
quick search on Google will yield many results on how best to deal with this
cognitive load, mostly revolving around the advice of creating aliases. This is
a great idea, but I would caution any Git user to pay attention to the specific
aliases they choose.

Most of the alias examples you find will abstract some lengthy command into a
trite two or three character expression. This does improve input speed, but at
the cost of even more cognitive load than the original commands they were meant
to replace. Consider these common aliases (that even I still use, if I'm being
honest):

```bash
co = checkout
ci = commit
```

This doesn't look so bad, does it? And even I have left these alone because they
are repeated gazillions of times a day, so they're always in the front of my
mind. This approach starts to fall apart, however, when you abstract a complex
command that *isn't* used very frequently.

Here's another alias:

```bash
graph = log -n 15 --graph --decorate --oneline
```

This gives me a nice little visual graph of the commits, including branch lines
in more complex histories. The log is clipped to 15 commits so as not to be
overwhelming.

```console
$ git graph
* 6932883 (HEAD -> master, origin/master, origin/gh-pages, gh-pages) GH-6: Remove Twitter and tweak About page
* a756022 GH-7: Update Uses page with Software section
* aaadb0b GH-6: Align nav items to the baseline
* d73f9a7 GH-6: Fix typo (bdckground => background)
* b1d2388 GH-6: Tweak Hotjar post
* dfbf378 GH-6: Add theme updates to tighten things up a bit
* 951cb5b GH-6: Add Knox Devs affiliations to About page
* e0110bf GH-7: Add 'Intelliquip Featured...' post
* b1cf8f1 GH-7: Add 'Multiple Layouts...' post
* e1539d2 GH-6: Change `http` to `https` where necessary
* bd368d7 GH-6: Fix CodePen link in About page
* 346547f GH-6: Add picture to About page
* ac20a1c GH-6: Update URL to reflect post title
* 6e1a647 GH-7: Add post about enabling HTTPS on blog
* f1d92d6 GH-6 / GH-7: Update Grid Layout notes post
```

This is powered by all of those extra options appended to the `log` command; the
majority of which I could never remember, especially if the alias were something
asinine like `lgdo15`, or whatever.

Here are some more examples:

```bash
# show my work from last month
last-month = log --all --since='1 month' --oneline --no-merges --author=bshowalter@intelliquip.com

# show my work from last week
last-week = log --all --since='1 week' --oneline --no-merges --author=bshowalter@intelliquip.com

# show total number of commits by user
leaderboard = shortlog -sn --all --no-merges

# list all my remote branches (assumes the branch names include my name)
my-remotes = branch -r --list *bobby*

# more memborable command for getting a new branch
new-branch = checkout -b
```

Check out (heh) that last one. Even though I *could* do the shorter `co -b`
(remember that first alias?), `new-branch` is easier to remember, and just a
little more explicit about what's happening. I'm speaking english, not
"computer"&mdash;especially when you consider the alias ends up forming the
almost-nearly-a-sentence, "g[e]t new branch \<branch name\>."

In fact, that's the goal with all of my aliases, and I'd argue it should be
yours as well. Git, like many other CLIs, contains loads of commands that have
even more options. Remembering everything is a fool's errand, especially when
you make it that much more difficult by trying to cram a complex expression into
just a few characters. By focusing on the end result and crafting an alias in
plain english, you're opening yourself up to a deeper and more efficient use of
the tool.

What about speed? Surely the advantage of those few letter aliases is the speed
with which they can be entered. Well, thanks to tab completion, `git le<TAB>`
&rarr; `git leaderboard` is just as fast as anything else you'd write.

Computers are meant to make us faster at our jobs. While they may be great at
understanding complex abstractions, you shouldn't have to. Take it easy on
yourself and write aliases that benefit you!
