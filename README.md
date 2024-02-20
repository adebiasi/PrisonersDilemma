# PrisonersDilemma

## Introduction
Inspired by https://github.com/pboothe/titfortat/blob/master/response.py.

In the visualization, each row is an iteration from top to bottom. Each rectangle represents an agent. They are ordered accordingly to their scores, from left to right. The color of the agent encode three information: 
- red -> loyal_after_defect probability
- green -> loyal_after_loyal probability
- blue -> loyal at the beginning probability

## Try it

You can try the iterative prisoner's dilemma here: https://adebiasi.github.io/PrisonersDilemma/

## Observations

The winners are not easy to predict.

In many situations the winning agents are the ones that always defect (black color) or that are loyal only at the beginning (blue color).

However, when the number on new random agents per generation is around the 10% of the total agents, [titfortat](https://en.wikipedia.org/wiki/Tit_for_tat) agents wins, i.e. loyal after loyal and loyal at the beginning (sky blue color)!
