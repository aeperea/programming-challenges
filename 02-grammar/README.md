# Solution to programming challenge #2

I've been following (Jamis Buck programming challenges on Medium)[https://medium.com/@jamis/weekly-programming-challenge-2-33ef134b39cd#.o8qtwuk0i].

This is my solution to the Week 2 challenge :)

## Instructions

Just run `ruby grammar.rb`, you should get 10 names generated.

## Details

I followed Jamis' link to Sindarin names and tried to parse and get as many Sindarin syllables (I used x-ray on JavaScript) as I could.

It made sense to me to separate these syllables in three categories, *first*, *middle* and *last*, this according to its place on the Sindarin word.

As I got very long names when I got 5 syllable names I separated them into a first and a last name. Similar (Lasse Ebert's)[https://github.com/lasseebert/jamis_challenge/tree/master/002_grammar] solution.

The default behaviour is to use these syllable categories when generating names, but you can change that by loading the `Grammar` module and running it "by hand".

```
Grammar.generate(filename_path, random_order_flag)
```

Where `filename_path` is the path to your grammar JSON file and `random_order_flag` is a bool that indicates if you want to use the syllables order or not (defaults to `false`).

Also, you can load up another grammar JSON file that follows the structure

```
[
  {
    "syllable": syllable,
    "order": order
  },
  ...
]
```

where `syllable` is, well, the syllable 🙃, and order is a string that can be `"first"`, `"middle"` or `"last"`.

## Example

```
$ ruby grammar.rb
> Esgalnaug
  Aralîn
  Celebrindû Celldrú
  Hírilornalag
  Bórrasnu Abin
  Legrovaldû Lingoll
  Barannîr
  Faradhothgaur Faercaun
  Mithwingin Tumdrú
  Rohgond
```

Any code smells or advice are welcome!
