---
layout: post
title: "From Vue.js Zero to Pokédex in Less Than a Month"
---

While holed-up in quarantine earlier this year, I came up with the ambitious
plan to develop a Vue.js-powered Pokédex app for my son's 4th birthday. Despite
not knowing a lick of Vue.js or where to even begin on this project, I was able
to lean on my experience in software design and development to deliver a
successful deployment. This post gives a high-level overview of the steps I took
to go from Vue.js zero to fully functioning Pokédex app in less than a month.

{% include toc.md %}

## Birthday plans

My son quickly fell in love with the world of Pokémon last winter after
receiving [Pokémon: Let's Go,
Pikachu!](https://www.nintendo.com/games/detail/pokemon-lets-go-pikachu-switch/)
for Christmas. That made choosing a theme for his 4th birthday pretty easy! When
planning his party, my wife and I came up with the idea to have a little
"Pokémon hunt" with party guests to encourage mingling. Each guest would receive
a unique name sticker with a particular Pokémon, and a checklist to serve as a
Pokédex. As guests interacted and found other Pokémon stickers, they would check
them off their list. We were pretty happy with our ice breaker idea!

## The big idea

Then
[COVID-19](https://en.wikipedia.org/wiki/2019%E2%80%9320_coronavirus_pandemic)
happened and the party plans fell through. I started thinking of ways to still
make his birthday special, and eventually came up with the idea to build an
interactive Pokédex app for Owen to play with. Trouble is, I had no idea how to
actually make the thing&mdash;and we were less than a month away from his
birthday 😱.

As it so happened, I had started working through a Vue.js course by [Maximilian
Schwarzmüller](https://twitter.com/maxedapps) around the same time. This Pokédex
idea seemed like the perfect opportunity to apply what I was learning to a
real-world use case.

## Where to start?

Despite my excitement, I was short on both time and expertise&mdash;not always a
great place to be, but not necessarily bad either since it would keep my
development cycles grounded in reality.

The first thing I did was start scribbling notes and sketching. My rough idea
was to get some [Pokémon wall
decals](https://www.amazon.com/gp/product/B07TQ9MJM1/) and print [QR
codes](https://docs.google.com/document/d/13JSqyVPQmlAES345SOwMGQ161Dcls2gCTL_K53ihnak/edit?usp=sharing)
for their names. I would scatter the stickers and codes around our home, and
have Owen scan the codes with a phone to "catch" the Pokémon. As he caught
Pokémon, they would appear in the Pokédex in a grid view. He could tap on
Pokémon he already caught to see a "details" view with that Pokémon's
description, stats, type, etc.

{% include figure.html src='/assets/images/pokedex_first_sketches.jpg'
alt='First draft notes and sketches of the fledgling Pokedex app'
caption='Pardon my atrocious handwriting 😬' %}

## Charting a course

Since I was just beginning with Vue.js and didn't have a clue how to make all of
these interactive pieces work, I laid out a road map to help me inch my way
to the final product.

1. Start with a static site featuring a finished Pokédex (use Vue.js components
   for details views).
2. Empty the Pokédex and add super basic "catch" functionality, whereby a
   "catch" button leads to a list of available Pokémon. Selecting a Pokémon from
   this list catches it and adds it to the Pokédex.
3. Replace the basic catch list with a proper, in-app QR code scanner.

Breaking the project up in this way ensured that if I ran out of time, I could
still deliver an experience that Owen would be able to enjoy. Even at the
absolute lowest level of experience, where there's no real interaction beyond
clicking pictures in a fully-finished Pokédex, we would still be able to have
fun roaming around our home and learning more about each Pokémon we found.

## Static site

This is arguably the most important step, as without this, I would have nothing
at all. I started with plain HTML and CSS to get a feel for the UI pieces I
would need for the app. Once I nailed down the look of the Pokédex and the
details views, I switched over to Vue.js.

Moving to Vue.js this early was a strategic choice. Although this first
iteration was only a "static" site, building it with Vue.js provided an easier
path to later phases of development. It also allowed me to component-ize the
details views, saving me precious time that would've been wasted duplicating and
wrangling plain HTML files.

## Add some interest

This step is where things really came to life, and where I spent most of my
development time.

{% include figure.html src='/assets/images/pokedex_v2.jpg' alt='Wireframes and
user journey for version 2 of the Pokedex that allows catching Pokemon with the
aid of a catch list' caption='' %}

At this point I was positively ripping through the Vue.js course, selectively
searching for the pieces I would need to keep this project moving along. Max did
a wonderful job dividing his course up into bite-sized pieces that made this
more manageable than it otherwise could have been.

This version of the Pokédex saw the addition of state management, and the
introduction of the basic experience/flow for catching Pokémon by selecting them
from a list. I only had about a week to go now, so I also took the time to apply
some much needed polish in the way of empty states, a "welcome" screen, a spot
for him to enter his name, etc.&mdash;all those little things that add up to
really make the experience fun. The QR reader functionality was going to be the
cherry on top, so I wanted to save that for last. If I couldn't get to it, I at
least had an app I could be proud of.

It's also worth mentioning that I chose to hand-roll the data for all 10 of the
Pokémon details views during this phase. Although there are great services like
[PokéAPI](https://pokeapi.co/) that I could have used to populate the necessary
data, I was afraid of losing time to incorporating yet another new concept into
my Vue.js learning. Getting up to speed on components, routing, state
management, etc. was already challenging enough. Perhaps in a v2 😄.

## And across the line

Thankfully, all of the hard parts of integrating a QR reader were taken care of
by [vue-qrcode-reader](https://github.com/gruhn/vue-qrcode-reader). This missing
piece was all I needed to fully realize the workflow I envisioned before I
started:

{% include figure.html src='/assets/images/pokedex_final_flow.jpg'
alt='Wireframes of final Pokedex workflow using the QR code scanner' caption=''
%}

With the leftover time I had allotted thinking the QR reader was going to be a
pain, I also added
[vuex-persistedstate](https://github.com/robinvdvleuten/vuex-persistedstate) so
the Pokédex could be saved to `localstorage` and would persist across browser
sessions.

It was an intense sprint from ideation to implementation, but the app was done!
🎉

## The payoff

The night before the big day, we scattered the Pokémon stickers and their QR
codes around our home, as planned. We also made up a [letter from Professor
Oak](https://docs.google.com/document/d/1xihr5zjKYmgdY0R9ALnwNl7gGQcTVI4dfcQ_rtQYDBE/edit?usp=sharing)
to help set the scene for this special activity.

He had a blast! Owen picked up on the flow for the app right away, and very
quickly was off scanning QR codes and checking out the Pokémon details without
much guidance from me. It was a joy watching his eyes light up every time he
found a Pokémon and got to scan it into his Pokédex.

### All dressed up and ready to go

{% include figure.html src='/assets/images/owen_pokemon_hunter.jpg' alt='Picture
of Owen just before he began his Pokemon hunt' caption='' %}

### Catching Piplup

<video controls preload="none"
src="/assets/videos/owen_catching_piplup.webm"></video>

### Catching Eevee

<video controls preload="none"
src="/assets/videos/owen_catching_eevee.webm"></video>

## Final thoughts

I wasn't quite sure I would be able to pull this off. Going from zero to fully
deployed and functional app in less than a month feels pretty satisfying. I
wouldn't have been able to deliver on my idea if I hadn't taken the time up
front to set the scope, develop a solid road map, and establish milestones that
ensured I would have something to use on Owen's birthday.

* * *

If you're interested in checking out the app for yourself, it's still up over at
[https://owen-pokedex.netlify.app](https://owen-pokedex.netlify.app) (don't
forget the [QR
codes](https://docs.google.com/document/d/13JSqyVPQmlAES345SOwMGQ161Dcls2gCTL_K53ihnak/edit?usp=sharing)).
There's also the [Github repo](https://github.com/orangedaisy/pokedex) if you're
interested in that (some day I'll get around to fixing up the open issues).
