let totalItems = table.length
let itemPerPage = $("option:selected").val()
let pages = Math.ceil(totalItems / itemPerPage)
//INITIAL STATE
createPagination(pages)
fillTable(table, 1, itemPerPage)
nextBTN()
prevBTN()

//FILLTER NUMBER OF ITEM
$(".form-select").change(function(){
        itemPerPage = $(this).children("option:selected").val();
        pages = Math.ceil(totalItems / itemPerPage)

        createPagination(pages)
        fillTable(table, 1, itemPerPage)
});

// //CHANGE PAGES WITH MOUSE CLICK
$(".pagination").on('click', function (e) {
    let currentPage = e.target.innerHTML
    if(!isNaN(currentPage)){
        //remove active from previous page
        $(".active").removeClass("active")
        //add active to current page
        e.target.parentNode.classList.add("active")
        fillTable (table, currentPage, itemPerPage)
        //when click on the last page, next button is disabled otherwise is enable
        currentPage == pages ? $(".next").addClass('disabled') : $(".next").removeClass("disabled")
        //when click on the first page, prev button is disabled otherwise is enable
        currentPage == 1 ? $(".prev").addClass('disabled') : $(".prev").removeClass("disabled")
    }
})


// //---------------------FUNCTIONS-------------------------

function fillTable(table, cPage, items) {
    let total = table.length
    let start = (cPage-1) * items
    let end = cPage * items < total ? cPage * items : total
    $('tbody').html(' ')
    for (let i = start; i < end; i++) {
        $("tbody").append(`<tr>
                                <th scope="row">${table[i].id}</th>
                                <td class="text-capitalize">${table[i].name}</td>
                                <td>${table[i].email}</td>
                                <td>${table[i].phone}</td>
                                <td>${table[i].date}</td> 
                            </tr>`)

    }
    $("tr:nth-child(odd)").css({backgroundColor: '#bef2f5'})
}

function createPagination(pages) {
    $(".pagination").html(`<li class="page-item prev disabled">
                                <a class="page-link" href="#" aria-label="Previous">
                                    <span aria-hidden="true">&laquo;</span>
                                </a>
                            </li>`)

    for (let i =1; i <= pages; i++) {
        $(".pagination").append(`<li class="page-item">
                                    <a class="page-link" href="#">
                                        ${i}
                                    </a>
                                </li>`)
    }
    $(".active").removeClass("active")/
    $(".pagination :nth-child(2)").addClass('active')
    $(".pagination").append(`<li class="page-item next">
                                <a class="page-link" href="#" aria-label="Next">
                                    <span aria-hidden="true">&raquo;</span>
                                </a>
                            </li>`)

}

//NEXT BUTTON FUNCTIONALITY
function nextBTN() {
    $(document).on('click', ".next", function (e) {
        $(".prev").removeClass("disabled")
        //change pages with next key
        if (!isNaN($(".active").next().children().text())) {//continue till the text of next sibling child is NOT A NUMBER
            $(".active").next().addClass("active")
            $(".active").prev().removeClass("active")
            let currentPage = $(".active").children().text()
            fillTable(table, currentPage, itemPerPage)
        }
        //disable the next key when last page is active
        if ($(".active").children().text() == pages) {
            $(".next").addClass('disabled')
        }
    })
}

//PREVIOUS BUTTON FUNCTIONALITH
function prevBTN() {
    $(document).on('click', ".prev", function (e) {
        $(".next").removeClass("disabled")
        //change pages with prev key
        if (!isNaN($(".active").prev().children().text())) {//continue till the text of previous sibling child is NOT A NUMBER
            $(".active").prev().addClass("active")
            $(".active").next().removeClass("active")
            let currentPage = $(".active").children().text()
            fillTable(table, currentPage, itemPerPage)
        }
        //disable the prev key when first page is active
        if ($(".active").children().text() == 1) {
            $(".prev").addClass('disabled')
        }
    })
}



