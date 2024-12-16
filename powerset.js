        document.addEventListener('DOMContentLoaded', function () {
            const doMathButton = document.getElementById('doMath');
            const inputSet = document.getElementById('inputSet');
            const finalAns = document.querySelector('.final-ans');
            const clearButton = document.getElementById('clearInput');
            
            const facts = [
                "Did you know? A power set contains all possible subsets of a given set, including the empty set and the set itself!",
                "Fun fact: The power set of the empty set is always {∅} since the empty set has only one subset—the empty set itself!",
                "Did you know? The number of subsets of a set with 'n' elements is \(2^n\). The more elements you have, the more subsets you get!",
                "The power set is connected to the Cartesian product! The Cartesian product can be seen as specific subsets of the power set.",
                "Interesting fact: The power set of a power set is known as the meta-power set. It contains the subsets of the original power set!",
                "Power sets are widely used in combinatorics to calculate the number of combinations of a set's elements. For a set with 'n' elements, the total number of subsets is \(2^n!\)",
                "Did you know? The power set is a fundamental concept in set theory, used in logic, computer science, and probability!",
                "Power sets appear in real-life scenarios, like when you choose pizza toppings! For three choices (cheese, pepperoni, mushrooms), the power set shows all possible topping combinations!",
                "In computer science, power sets are used to explore all possible combinations and subsets. Algorithms that involve recursion often generate power sets!",
                "The power set can help you visualize set operations like union, intersection, and difference by showing all combinations of sets!"
            ];

            function getRandomFact() {
                const randomIndex = Math.floor(Math.random() * facts.length);
                return facts[randomIndex];
            }

            function getPowerSet(arr) {
                const powerSet = [];
                const totalSubsets = Math.pow(2, arr.length);
                for (let i = 0; i < totalSubsets; i++) {
                    const subset = [];
                    for (let j = 0; j < arr.length; j++) {
                        if (i & (1 << j)) {
                            subset.push(arr[j]);
                        }
                    }
                    powerSet.push(subset);
                }
                return powerSet;
            }

            function formatPowerSet(powerSet) {
                return powerSet.map(subset => {
                    return `{${subset.length === 0 ? '∅' : subset.join(', ')}}`;
                }).join(', ');
            }

            function typeText(text, element, minSpeed = 100, maxSpeed = 10) {
                let index = 0;
                let speed = minSpeed;
                let typingInterval;

                function typingStep() {
                    element.innerHTML = text.substring(0, index++);
                    if (index <= text.length) {
                        speed = Math.max(maxSpeed, speed - 2);
                        typingInterval = setTimeout(typingStep, speed);
                    }
                }

                typingStep();
            }

            doMathButton.addEventListener('click', function () {
                const inputText = inputSet.value.trim();

                if (inputText === '') {
                    Swal.fire({
                        title: "<strong>WRONG INPUT</strong>",
                        icon: "info",
                        html: `
                            Please Enter A Valid Input Separated By Comma. For example: [a,b,c,d]
                        `,
                        showCloseButton: true,
                        showCancelButton: false,
                        focusConfirm: false,
                        confirmButtonText: `
                            <i class="fa fa-thumbs-up"></i> OK
                        `,
                        confirmButtonAriaLabel: "Thumbs up, great!",
                        customClass: {
                            title: 'custom-title',
                            content: 'custom-content',
                            confirmButton: 'custom-button'
                        }
                    });
                    return;
                }

                const inputArray = inputText.split(',').map(item => item.trim());

                const powerSet = getPowerSet(inputArray);

                const formattedPowerSet = `P({${inputArray.join(', ')}}) = {${formatPowerSet(powerSet)}}`;

                finalAns.innerHTML = '';

                typeText(formattedPowerSet, finalAns, 100, 20);
            });

            clearButton.addEventListener('click', function () {
                inputSet.value = '';
                finalAns.innerHTML = `<p class="hint">${getRandomFact()}</p>`;
                finalAns.classList.remove('success');
            });

            finalAns.innerHTML = `<p class="hint">${getRandomFact()}</p>`;
        });
