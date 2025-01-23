document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting

    // Use querySelector to get the input values
    const a = document.querySelector('#inputA').value;
    const b = document.querySelector('#inputB').value;

    // Convert to numbers and calculate the sum
    const sum = Number(a) + Number(b);

    // Display the result
    document.querySelector('#result').innerHTML = `Sum: ${sum}`;
});
