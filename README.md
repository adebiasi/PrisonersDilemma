# PrisonersDilemma

## Introduction

Inspired by [this script](https://github.com/pboothe/titfortat/blob/master/response.py), this project explores the Iterated Prisoner's Dilemma through a dynamic, evolving simulation.

In the visualization, each row represents an iteration (from top to bottom), and each rectangle represents an agent. Agents are sorted from left to right by their score. The color of each rectangle encodes three key traits:
- **Red** → probability of cooperating after the opponent defects
- **Green** → probability of cooperating after the opponent cooperates
- **Blue** → probability of cooperating at the beginning

## Try It

You can try the Iterated Prisoner's Dilemma simulation here:  
👉 [https://adebiasi.github.io/PrisonersDilemma/](https://adebiasi.github.io/PrisonersDilemma/)

## Observations

The winners of the simulation are not always easy to predict.

In many cases, the dominant agents are either:
- those that **always defect** (appearing black), or
- those that **cooperate only at the beginning** (appearing blue).

![](https://github.com/adebiasi/PrisonersDilemma/blob/main/196-55.png)

However, when around **10%** of the agents in each generation are replaced with random new agents, **Tit-for-Tat** strategies tend to win. These agents start by cooperating and then mirror the opponent’s previous action—cooperating after cooperation but not after defection. They typically appear **sky blue** in the visualization.

![](https://github.com/adebiasi/PrisonersDilemma/blob/main/196-16.png)
