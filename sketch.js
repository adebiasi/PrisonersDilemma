let num_new_agents;
let pair_interactions;
let total_interactions;

let populations;
let iteration;

let payoff;

let tradeoff_R;
let tradeoff_P;
let tradeoff_T;
let tradeoff_S;

function setup() {

    createCanvas(1000, 1000);
    let runButton = select('#run');
    runButton.mousePressed(startSimulation);
    startSimulation()
}

function startSimulation() {
    background(0);
    let num_population = select('#num_agents_slider').value();
    select('#num_agents').html(num_population);

    num_new_agents = Math.round(num_population / 100 * select('#perc_new_agents_slider').value());
    select('#num_new_agents').html(num_new_agents);

    populations = Array.from({length: num_population}, () => new Agent(null, null, null, false));

    pair_interactions = select('#num_games_slider').value();
    select('#num_games').html(pair_interactions);

    total_interactions = select('#num_generations_slider').value();
    select('#num_generations').html(total_interactions);

    iteration = 0;

    tradeoff_R = parseInt(select('#tradeoff_R').value());
    tradeoff_P = parseInt(select('#tradeoff_P').value());
    tradeoff_T = parseInt(select('#tradeoff_T').value());
    tradeoff_S = parseInt(select('#tradeoff_S').value());

    payoff = {
        "loyal,loyal": tradeoff_R,
        "loyal,defect": tradeoff_S,
        "defect,defect": tradeoff_P,
        "defect,loyal": tradeoff_T
    };

    loop();
}

function draw() {
    interact()

    let winners = populations.slice(0, populations.length - num_new_agents);
    winners = winners.map(function (obj) {
        console.log("obj: "+obj)
        let mut = obj.mutate();
        console.log("mut: "+mut)
        return mut;
    });
    winners.map(a => a.is_cloned = true);
    let new_populations = Array.from({length: num_new_agents}, () => new Agent(null, null, null, false));
    populations = winners.concat(new_populations);
    iteration++;
    if (iteration == total_interactions) {
        noLoop();
    }

}


function mousePressed() {

}


class Agent {

    constructor(defectresp, loyalresp, loyalnone, is_cloned) {

        this.is_cloned = is_cloned;

        if (defectresp == null || loyalresp == null || loyalnone == null) {
            this.loyal_after_defect = parseFloat(random(0.0, 1.0).toFixed(2));
            this.loyal_after_loyal = parseFloat(random(0.0, 1.0).toFixed(2));
            this.loyal_after_none = parseFloat(random(0.0, 1.0).toFixed(2));
        } else {
            this.loyal_after_defect = constrain(defectresp, 0.01, 0.99);
            this.loyal_after_loyal = constrain(loyalresp, 0.01, 0.99);
            this.loyal_after_none = constrain(loyalnone, 0.01, 0.99);

        }
        this.wealth = 0.0;
    }

    play(opp_moves) {
        let choice = random();
        if (opp_moves.length == 0) {
            if (this.loyal_after_none > choice) {
                return "loyal";
            } else {
                return "defect";
            }
        } else {
            let opp_last_move = opp_moves[opp_moves.length - 1]

            if (opp_last_move === "defect") {
                if (this.loyal_after_defect > choice) {
                    return "loyal";
                } else {
                    return "defect";
                }
            } else {
                if (this.loyal_after_loyal > choice) {
                    return "loyal";
                } else {
                    return "defect";
                }
            }
        }
    }

    clone() {
        return new Agent(this.loyal_after_defect, this.loyal_after_loyal, this.loyal_after_none, true);
    }

    mutate() {
        return new Agent(
            parseFloat((this.loyal_after_defect + random(-0.02, 0.02)).toFixed(2)),
            parseFloat((this.loyal_after_loyal + random(-0.02, 0.02)).toFixed(2)),
            parseFloat((this.loyal_after_none + random(-0.02, 0.02)).toFixed(2)),
            true);
    }

    toString() {
        return `Agent(prob C after D: ${this.loyal_after_defect}, prob C after C: ${this.loyal_after_loyal}, prob start with C: ${this.loyal_after_none}, score: ${this.wealth})`;
    }
}

function interact() {

    // for (let iteration = 0; iteration < total_interactions; iteration++) {
    for (let i = 0; i < populations.length; i++) {
        populations[i].wealth = 0;
    }
    for (let one_index = 0; one_index < populations.length; one_index++) {
        let one = populations[one_index];
        for (let other_index = 0; other_index < one_index+1; other_index++) {
            let other = populations[other_index];
            let prev_responses_one = [];
            let prev_responses_other = [];
            for (let pair_interaction = 0; pair_interaction < pair_interactions; pair_interaction++) {
                [prev_responses_one, prev_responses_other] = [prev_responses_one.concat(one.play(prev_responses_other)), prev_responses_other.concat(other.play(prev_responses_one))];
                // console.log(prev_responses_one)
                one.wealth += payoff[`${prev_responses_one[prev_responses_one.length - 1]},${prev_responses_other[prev_responses_other.length - 1]}`];
                other.wealth += payoff[`${prev_responses_other[prev_responses_other.length - 1]},${prev_responses_one[prev_responses_one.length - 1]}`];
                // other.wealth += payoff[`${response_other},${response_one}`];
            }
        }
        // populations[one_index].wealth = one.wealth;

    }


    populations.sort((a, b) => b.wealth - a.wealth);
    select('#top_agents').html(get_rect_text(populations[0]) + populations[0] + "<br><br>" + get_rect_text(populations[1]) + populations[1] + "<br><br>" + get_rect_text(populations[2]) + populations[2])

    let h_step = height / total_interactions;
    let w_step = width / populations.length;
    for (let i = 0; i < populations.length; i++) {
        let curr_agent = populations[i]
        let w = (w_step * i);
        let h = (h_step * iteration);
        // strokeWeight(stroke_w);
        if (curr_agent.is_cloned) {
            noStroke();
        } else {
            stroke(255, 255, 255);
        }
        fill(255 * curr_agent.loyal_after_defect, 255 * curr_agent.loyal_after_loyal, 255 * curr_agent.loyal_after_none);
        rect(w, h, w_step, h_step);
    }

}

function get_rect_text(curr_agent) {
    let cols = "rgb(" + (255 * curr_agent.loyal_after_defect) + "," + (255 * curr_agent.loyal_after_loyal) + "," + (255 * curr_agent.loyal_after_none) + ")";
    let rect_1 = "<div style=\"width: 60px; height: 20px; background-color: " + cols + ";\"></div>"
    return rect_1
}