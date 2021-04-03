

const scoreString = `
    <div class="container-items ">
        <div class="inner-item score-heading">
            <span>Still Here</span>
        </div>
    </div>
    <div class="container-items">
        <div class="inner-item score">
            <span>You Scored: </span>
            <span style="font-size: 6rem; font-weight: bold;">{score}</span>
        </div>
    </div>
        <div class="container-items ">
        <div class="inner-item advice">
            <span>Listen to</span>
            <span style="cursor:pointer; font-size: 3rem; font-weight: bold;">Still Here</span>
        </div>
    </div>
    <div class="container-items">
        <div class="inner-item">
            <button class="btn option-btn fourth">Play Again</button>
        </div>
    </div>
`;

export function templateString(score: number) {
    return scoreString.replace("{score}", score.toString());
}