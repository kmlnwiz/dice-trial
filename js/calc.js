function calc() {
    //変数
    var dice_min_value = document.getElementById("dice_min_value");
    dice_min_value = parseInt(dice_min_value.value);
    var dice_max_value = document.getElementById("dice_max_value");
    dice_max_value = parseInt(dice_max_value.value);
    var dice_play_times = document.getElementById("dice_play_times");
    dice_play_times = parseInt(dice_play_times.value);
    var play_times = document.getElementById("play_times");
    play_times = parseInt(play_times.value);
    var aim_sum = document.getElementById("aim_sum");
    aim_sum = parseInt(aim_sum.value);

    let aim_over_times = 0;
    let probability = 0;

    let options = document.form.type_calc;
    let num = options.selectedIndex;
    let type_calc = options.options[num].value;

    total_array = [];
    //console.log(type_calc);

    var contentBlock = document.getElementById('data_table');
    contentBlock.innerHTML = ``;

    for (let i = 0; i < play_times; i++) {
        let dice_combination = [];

        for (let j = 0; j < dice_play_times; j++) {
            dice_combination.push(Math.floor(Math.random() * (dice_max_value - dice_min_value + 1)) + dice_min_value);
        };

        let total = dice_combination.reduce((sum, element) => sum + element, 0);

        total_array.push(total);

        if (type_calc == 1) {
            conditions = total >= aim_sum;
        } else if (type_calc == 2) {
            conditions = total == aim_sum;
        } else if (type_calc == 3) {
            conditions = total <= aim_sum;
        }

        //console.log(conditions)

        if (conditions) {
            aim_over_times += 1;
        };

        //console.log(dice_combination, `合計：${total}`);

        if (i < 100) {
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

    //console.log(total_array);

    probability = Math.round((aim_over_times / play_times) * 10000) / 100;

    //console.log(`${conditions.toString()}`, `${play_times}回中${aim_over_times}回`, `約${probability.toFixed(2)}%`);

    var result1 = document.getElementById('result-1');
    result1.innerHTML = `<h4 class="alert-heading result-1">試行結果　(${play_times} 回)</h4>`;

    var result2 = document.getElementById('result-2');
    result2.innerHTML = `<p class="mb-0 result-2">${aim_over_times} / ${play_times} 回　(約 ${probability.toFixed(2)} %)</p>`;

    calc_option();
    return total_array;
};

function calc_option() {
    //平均値
    let average = total_array.reduce((previous, current) =>
        previous + current // 前の要素につぎの要素を足す
    ) / total_array.length; // 要素数で割る
    average = Math.round(average * 100) / 100;
    //console.log("平均", average);

    //分散
    let squaredDifference = total_array.map((current) => {
        const difference = current - average; // 平均値との差を求める
        return Math.round(difference ** 2 * 100) / 100; // 差を2乘する
    });
    //console.log(squaredDifference);

    let variance = squaredDifference.reduce((previous, current) =>
        previous + current // 前の要素につぎの要素を足す
    ) / total_array.length; // 要素数で割る
    variance = Math.round(variance * 100) / 100;
    //console.log("分散", variance);

    //標準偏差
    let standardDeviation = Math.sqrt( // 分散の平方根を求める
        total_array.map((current) => { // 各要素について
            let difference = current - average; // 平均値との差を求める
            return Math.round(difference ** 2 * 100) / 100; // 差を2乘する
        })
        .reduce((previous, current) =>
            previous + current // 差の2乗をすべて足す
        ) / total_array.length // 差の2乗の平均が分散
    );
    standardDeviation = Math.round(standardDeviation * 100) / 100;
    //console.log("標準偏差", standardDeviation);

    //中央値
    var median_calc = function (arr, fn) {
        var half = (arr.length / 2) | 0;
        var temp = arr.sort(fn);

        if (temp.length % 2) {
            return temp[half];
        }

        return (temp[half - 1] + temp[half]) / 2;
    };
    median = median_calc(total_array);
    //console.log("中央値", median);


    var result3 = document.getElementById('result-3');
    result3.innerHTML = `<p class="my-0" id="result-3">平均値：${average.toFixed(2)}　中央値：${median.toFixed(2)}</p>`;

    var result4 = document.getElementById('result-4');
    result4.innerHTML = `<p class="my-0" id="result-4">分散：${variance.toFixed(2)}　標準偏差：${standardDeviation.toFixed(2)}</p>`;
}
