//INITIAL STATES
$("#counter-input input").val(5)
$("#time-input input").val("23:00")
$("#counter-input input").attr('readonly',true)
$("#time-input input").attr('readonly',true)

//ADD BUTTON TO THE HTML
$(".incremental-input").prepend('<button class="btn btn-dec">-</button>')
$(".incremental-input").append('<button class="btn btn-inc">+</button>')

// BUTTONS FUNCTIONALITY
$(document).on('click','.btn', function () {
    let id = $(this).parent().attr("id")
    let input_val = $(`#${id} input`).val()
    let operand = $(this).html()
    let newInput = id === "counter-input" ? counterOperator(operand, input_val, 1) : timeOperand(operand, input_val, 15)
    let input = operand === "+"? $(this).prev() : $(this).next()
    
    input.val(newInput) 
})


const counterOperator = (op, input_val, step) =>{
    input_val = Number(input_val)
    switch (op) {
        case '+':
            return input_val+step 
        case '-':
            return input_val-step >= 0 ? input_val-step : input_val
        }
}

function timeOperand(op, input_val, step) {
    switch (op) {
        case '+':
            input_val = hourToMin(input_val)
            return input_val == 24*60 ?  minToHour(input_val) : minToHour(input_val+step) 
        case '-':
            input_val = hourToMin(input_val)
            return input_val-step >= 0 ? minToHour(input_val-step) : minToHour(input_val)
        }
}

function minToHour(min) {
    let hour = Math.floor(min/60)
 
    let minute = min % 60
    
    return minute>=10 ? `${hour}:${minute}` : `${hour} :0${minute}`
}

function hourToMin(h) {
    h = h.split(":")
    let hour = Number(h[0])
    let minute = Number(h[1])

    return hour*60+minute 
}





