//PLAGIN
(function( $ ) {
 
    $.fn.incremental = function(options) {
        
        let settings = $.extend({
            counterMood: 'time',
            start:'6:00',
            steps: 15,

        },options)

        this.prepend('<button class="btn btn-dec">-</button>')
        this.append('<button class="btn btn-inc">+</button>')
        this.children('input').val(settings.start)
        this.children('input').attr('readonly',true)

        return this.each(function(index,element){$(element).find('button').on('click', function () {
            let input = $(element).find("input")
            let operand = $(this).html()
            let newInput = Operator(operand, input.val(), settings.steps, settings.counterMood)
            
            input.val(newInput) 
        })
    })
    };

    
    
    
    const Operator = (op, input_val, step, mood) =>{
        input_val = mood === 'time'? input_val : Number(input_val)
        console.log(mood);
        switch (op) {
            case '+':
                if(mood === 'time'){
                    input_val = hourToMin(input_val)
                    return input_val == 24*60 ?  minToHour(input_val) : minToHour(input_val+step) 
                }
                return input_val+step 
            case '-':
                if(mood === 'time'){
                    input_val = hourToMin(input_val)
                    return input_val-step >= 0 ? minToHour(input_val-step) : minToHour(input_val)
                }
                return input_val-step >= 0 ? input_val-step : input_val
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

}( jQuery ));



$("#time-input").incremental()
$("#counter-input").incremental({counterMood:'numeric',start:"5", steps: 1})








