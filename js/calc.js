function calc() {
    //変数
    var dice_max_value = document.getElementById("dice_max_value");
    dice_max_value = dice_max_value.value;
    var dice_play_times = document.getElementById("dice_play_times");
    dice_play_times = dice_play_times.value;
    var play_times = document.getElementById("play_times");
    play_times = play_times.value;
    var aim_sum = document.getElementById("aim_sum");
    aim_sum = aim_sum.value;

    let aim_over_times = 0;
    let probability = 0;

    let options = document.form.type_calc;
    let num = options.selectedIndex;
    let type_calc = options.options[num].value;

    console.log(type_calc);

    var contentBlock = document.getElementById('data_table');
    contentBlock.innerHTML = ``;

    for (let i = 0; i < play_times; i++) {
        let dice_combination = [];

        for (let j = 0; j < dice_play_times; j++) {
            dice_combination.push(Math.floor(Math.random() * dice_max_value) + 1);
        };

        let total = dice_combination.reduce((sum, element) => sum + element, 0);

        if (type_calc == 1) {
            conditions = total >= aim_sum;
        } else if (type_calc == 2) {
            conditions = total == aim_sum;
        } else if (type_calc == 3) {
            conditions = total <= aim_sum;
        }

        console.log(conditions)

        if (conditions) {
            aim_over_times += 1;
        };
        console.log(dice_combination, `合計：${total}`);

        if (i < 300) {
            if (conditions) {
                var data = `<tr>
      <th scope="col">${i + 1}</th>
      <th scope="col">${dice_combination}</th>
      <th scope="col">${total}</th>
      <th scope="col">${conditions ? true : false}</th>
    </tr>`;
            } else {
                var data = `<tr class="table-secondary">
      <th scope="col">${i + 1}</th>
      <th scope="col">${dice_combination}</th>
      <th scope="col">${total}</th>
      <th scope="col">${conditions ? true : false}</th>
    </tr>`;
            };
            var contentBlock = document.getElementById('data_table');
            contentBlock.insertAdjacentHTML('beforeend', data);
        };
    };

    probability = Math.floor((aim_over_times / play_times) * 10000) / 100;

    console.log(`${conditions.toString()}`, `${play_times}回中${aim_over_times}回`, `約${probability.toFixed(2)}%`);

    var result = document.getElementById('result-1');
    result.innerHTML = `<h4 class="alert-heading result-1">試行結果　( ${play_times} 回)</h4>`;

    var result = document.getElementById('result-2');
    result.innerHTML = `<p class="mb-0 result-2">${aim_over_times} / ${play_times} 回　(約 ${probability.toFixed(2)} %)</p>`;

};
