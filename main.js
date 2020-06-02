//Credentials
const userName = 'iurii'
const password = '1234'
//Trigers
let bold = false
let italic = false
let underline = false
let crossline = false
//Color palette: generate array with colors
let palette = []
let r, g, b
for (let i = 55; i <= 255; i += 50) {
    r = i
    g = 10
    b = 10
    palette.push({
        'r': r,
        'g': g,
        'b': b
    })
}
for (let i = 55; i <= 255; i += 50) {
    r = 10
    g = i
    b = 10
    palette.push({
        'r': r,
        'g': g,
        'b': b
    })
}
for (let i = 55; i <= 255; i += 50) {
    r = 10
    g = 10
    b = i
    palette.push({
        'r': r,
        'g': g,
        'b': b
    })
}
for (let i = 255; i >= 0; i -= 50) {
    r = i
    g = i
    b = i
    palette.push({
        'r': r,
        'g': g,
        'b': b
    })
}


////////////////// ON PAGE LOAD //////////////////
$(() => {
    $('.A > li').click(selectFont) //assign click event to font items
    $('.T > li').click(selectSize) //assign click event to size items
    for (let i = 0; i < palette.length; i++) { //fill color palettes with background colors
        $('.palette td').eq(i).css('background-color', `rgb(${palette[i].r}, ${palette[i].g}, ${palette[i].b})`)
        $('.background td').eq(i).css('background-color', `rgb(${palette[i].r}, ${palette[i].g}, ${palette[i].b})`)
    }
    $('button[onclick="alignText()"]').eq(0).css('background-color', 'rgba(139, 168, 197, 0.3)') //focus first alight item
    $('.palette td').click(selectTextColor)
    $('.bgColors td').click(selectBackgroundColor)
    $('.bgImages img').click(selectBackgroundImage)
    $('.bStyles li').click(selectBorderStyle)
    $('.bColors li').click(selectBorderColor)
    $('.markOl li').click(selectMarkOl)
    $('.markUl li').click(selectMarkUl)
    $('.loginForm').fadeOut()
})
//////////////////////////////////////////////////

//Login/Logout functions
function triggerLogin() { // show Login form
    $('.loginForm').velocity('fadeIn', {
        duration: 300,
        display: 'flex'
    })
    resetLogin()
}

function triggerLogout() { // show Logout form
    $('.logoutForm').velocity('fadeIn', {
        duration: 300,
        display: 'flex'
    })
}
//login
function runLogin() { // Click Login button on Login form
    resetLoginCss()
    const login = $('input#login').val()
    const pass = $('input#password').val()
    const loginRegExp = /^[a-z]\w{1,31}$/
    const passRegExp = /^.{4,32}$/
    let valid = true

    if (!login) {
        valid = false
        $('.loginForm>p.invalidInput').css('opacity', '1')
        $('.loginForm>p.invalidInput').text("Fields are empty")
        $('#login').css('border-color', 'red')
    }
    if (!pass) {
        valid = false
        $('.loginForm>p.invalidInput').css('opacity', '1')
        $('.loginForm>p.invalidInput').text("Fields are empty")
        $('#password').css('border-color', 'red')
    }
    if (valid) {
        if (!loginRegExp.test(login)) {
            valid = false
            $('.loginForm>p.invalidInput').css('opacity', '1')
            $('.loginForm>p.invalidInput').text("Rules: Login 2-32 letter/digits, Psw 4-32 symbols")
            $('#login').css('border-color', 'red')
        }
        if (!passRegExp.test(pass)) {
            valid = false
            $('.loginForm>p.invalidInput').css('opacity', '1')
            $('.loginForm>p.invalidInput').text("Rules: Login 2-32 letter/digits, Psw 4-32 symbols")
            $('#password').css('border-color', 'red')
        }
    }
    if (valid) {
        if (login != userName || pass != password) {
            valid = false
            $('.loginForm>p.invalidInput').css('opacity', '1')
            $('.loginForm>p.invalidInput').text("Incorrect Login/Password")
            $('#login').css('border-color', 'red')
            $('#password').css('border-color', 'red')
        }
    }
    if (valid) {
        $('.loginForm').fadeOut()
        $('#editBt').attr('disabled', false)
        $('.editBt').css('backgroundColor', 'rgb(255, 255, 250)')
        $('#showLogout').show()
        $('#showLogin').hide()
        resetLogin()
    }
}

function resetLoginCss() {
    $('.loginForm>p.invalidInput').css('opacity', '0')
    $('#login').css('border-color', 'rgb(145, 160, 160)')
    $('#password').css('border-color', 'rgb(145, 160, 160)')
}

function resetLogin() {
    $('#login').val('')
    $('#password').val('')
    resetLoginCss()
}

//logout
function runLogout() {
    $('#editBt').attr('disabled', true)
    $('.editBt').css('backgroundColor', 'rgb(205, 205, 205)')
    $('#showLogout').hide()
    $('#showLogin').show()
    $('.logoutForm').fadeOut()
}

//Top Control section functions
function edit() {
    $('textarea').val($('.text').html())
    $('textarea').fadeIn()
    $('.text').hide()
    $('.topControls').eq(0).hide()
    $('.topControls').eq(1).velocity('fadeIn', {
        display: 'flex',
        duration: 300
    })

}
//bold text
function boldText() {
    if (bold) {
        $('.text').css('font-weight', 'normal')
        $(event.target).parent().css('background-color', 'transparent')
        bold = false
    } else {
        $('.text').css('font-weight', 'bold')
        $(event.target).parent().css('background-color', 'rgba(139, 168, 197, 0.3)')
        bold = true
    }
}
//italic text
function italicText() {
    if (italic) {
        $('.text').css('font-style', 'normal')
        $(event.target).parent().css('background-color', 'transparent')
        italic = false
    } else {
        $('.text').css('font-style', 'italic')
        $(event.target).parent().css('background-color', 'rgba(139, 168, 197, 0.3)')
        italic = true
    }
}
//underline text
function underlineText() {
    if (underline) {
        $('.text').css('text-decoration', 'none')
        $(event.target).parent().css('background-color', 'transparent')
        underline = false
    } else {
        $('.text').css('text-decoration', 'underline')
        $(event.target).parent().css('background-color', 'rgba(139, 168, 197, 0.3)')
        $('#crossline').css('background-color', 'transparent')
        underline = true
        crossline = false
    }
}
//crossline text
function crosslineText() {
    if (crossline) {
        $('.text').css('text-decoration', 'none')
        $(event.target).parent().css('background-color', 'transparent')
        crossline = false
    } else {
        $('.text').css('text-decoration', 'line-through')
        $(event.target).parent().css('background-color', 'rgba(139, 168, 197, 0.3)')
        $('#underline').css('background-color', 'transparent')
        crossline = true
        underline = false
    }
}
//align text
function alignText() {
    const attr = $(event.target).attr('src')
    if (attr.includes('left')) {
        $('.text').css('text-align', 'left')
    } else if (attr.includes('justify')) {
        $('.text').css('text-align', 'center')
    } else $('.text').css('text-align', 'right')
    $(event.target).parent().parent().children().css('background-color', 'transparent')
    $(event.target).parent().css('background-color', 'rgba(139, 168, 197, 0.4)')
}

//font
function showFontList() {
    $('.A').fadeIn()
}

function selectFont() {
    $('.text').css('font-family', $(this).text())
    $('.A').fadeOut()
}

function showSizeList() {
    $('.T').fadeIn()
}

function selectSize() {
    $('.text').css('font-size', $(this).text())
    $('.T').fadeOut()
}

//text color
function showColorPalette() {
    $('.palette').fadeIn()
}

function selectTextColor() {
    $('.text').css('color', $(this).css('background-color'))
    $('.palette').fadeOut()
}

//Background colors
function showBackgroundMenu() {
    $('.background').fadeIn()
}

function showBackgroundColors() {
    $('.bgColors').fadeIn()
    $('.bgImages').hide()
    $('.bgFile').hide()
    $('.bgButtons button').css('background-color', 'transparent')
    $(event.target).css('background-color', 'lightskyblue')
}

function selectBackgroundColor() {
    $('.text').css('background-color', $(this).css('background-color'))
    $('.text').css('background-image', 'none')
}
//background images
function showBackgroundImages() {
    $('.bgColors').hide()
    $('.bgImages').fadeIn()
    $('.bgFile').hide()
    $('.bgButtons button').css('background-color', 'transparent')
    $(event.target).css('background-color', 'lightskyblue')
}

function selectBackgroundImage() {
    $('.text').css('background-image', `url(${this.src})`)
}
//background file
function showBackgroundFile() {
    $('.bgColors').hide()
    $('.bgImages').hide()
    $('.bgFile').fadeIn()
    $('.bgButtons button').css('background-color', 'transparent')
    $(event.target).css('background-color', 'lightskyblue')
}

function selectBackgroundFile() {
    const imagePath = URL.createObjectURL(event.target.files[0])
    $('.text').css('background-image', `url("${imagePath}")`)
    $('.bgFile > span').text(event.target.files[0].name)
}

//Edit Mode
function save() { //Save
    $('.topControls').eq(0).velocity('fadeIn', {
        display: 'flex',
        duration: 300
    })
    $('.topControls').eq(1).hide()
    $('.text').html($('textarea').val())
    $('textarea').fadeOut()
    $('.text').fadeIn()
}

function showBorderStyle() { //Choose border style
    $('.bStyles').fadeIn()

}

function showBorderColor() { //Choose border color
    $('.bColors').fadeIn()
}

function selectBorderStyle() {
    event.preventDefault()
    $('.bStyles').fadeOut()
    $('#borderStyle').text($(this).text())

}

function selectBorderColor() {
    event.preventDefault()
    $('#borderColor').text($(this).text())
    $('.bColors').fadeOut()
}

function resetTbl() { //reset table
    $('.tableOptions').trigger('reset')
    $('#borderStyle').text('Choose style...')
    $('#borderColor').text('Choose color...')
    resetTblCss()
}

function resetTblCss() { //clear error message and fields red borders
    $('#countTr').css('border-color', 'rgb(145, 160, 160)')
    $('#countTd').css('border-color', 'rgb(145, 160, 160)')
    $('#tdWidth').css('border-color', 'rgb(145, 160, 160)')
    $('#tdHeight').css('border-color', 'rgb(145, 160, 160)')
    $('#borderWidth').css('border-color', 'rgb(145, 160, 160)')
    $('#borderStyle').css('border-color', 'rgb(145, 160, 160)')
    $('#borderColor').css('border-color', 'rgb(145, 160, 160)')
    $('.tableOptions .invalidInput').css('opacity', '0')
}

function createTblHtml() { //create table
    let tbl = '<table>'
    let valid = true
    resetTblCss()
    let countTr = $('#countTr').val()
    let countTd = $('#countTd').val()
    let tdWidth = $('#tdWidth').val()
    let tdHeight = $('#tdHeight').val()
    let borderWidth = $('#borderWidth').val()
    let borderStyle = $('#borderStyle').text()
    let borderColor = $('#borderColor').text()
    //form validation
    if (!countTr) {
        $('#countTr').css('border-color', 'red')
        valid = false
    }
    if (!countTd) {
        $('#countTd').css('border-color', 'red')
        valid = false
    }
    if (!tdWidth) {
        $('#tdWidth').css('border-color', 'red')
        valid = false
    }
    if (!tdHeight) {
        $('#tdHeight').css('border-color', 'red')
        valid = false
    }
    if (!borderWidth) {
        $('#borderWidth').css('border-color', 'red')
        valid = false
    }
    if (borderStyle == 'Choose style...') {
        $('#borderStyle').css('border-color', 'red')
        valid = false
    }
    if (borderColor == 'Choose color...') {
        $('#borderColor').css('border-color', 'red')
        valid = false
    }

    if (valid) { //table html creation
        for (let i = 0; i < countTr; i++) {
            tbl += '<tr>'
            for (let j = 0; j < countTd; j++) {
                tbl += `<td style="width:${tdWidth}px;height:${tdHeight}px;border:${borderWidth}px ${borderStyle} ${borderColor}"></td>`
            }
            tbl += '</tr>'
        }
        tbl += '</table>'
        $('textarea').val(($('textarea').val() + tbl))
        $('.table').fadeOut()
        resetTbl()
    } else {
        $('.tableOptions .invalidInput').css('opacity', '1')
    }
}

function addTable() {
    $('.table').fadeIn()
}


// Adding list
// Show add ordered list window
function addOList() {
    $('.listAdd').eq(0).fadeIn()
}

function showMarkOl() {
    $('.markOl').fadeIn()
}

function selectMarkOl() {
    event.preventDefault()
    $('#markOl').text($(this).text())
    $('.markOl').fadeOut()
}

function createOListHtml() {
    resetOrderedListCss()
    let valid = true
    let count = $('#countOl').val()
    let mark = $('#markOl').text()
    if (!count) {
        valid = false
        $('#countOl').css('border-color', 'red')
        $('.listForm .invalidInput').css('opacity', '1')
    }
    if (mark == 'Choose OL type mark...') {
        valid = false
        $('#markOl').css('border-color', 'red')
        $('.listForm .invalidInput').css('opacity', '1')
    }
    if (valid) {
        switch (mark) {
            case '1':
                mark = 'decimal'
                break
            case 'I':
                mark = 'upper-roman'
                break
            case 'i':
                mark = 'lower-roman'
                break
            case 'a':
                mark = 'lower-alpha'
                break
            case 'A':
                mark = 'upper-alpha'
                break
        }
        let oLst = `<ol style="list-style-type:${mark};margin-left:20px">`
        for (let i = 0; i < count; i++) {
            oLst += `<li>item ${i}</li>`
        }
        oLst += '</ol>'
        $('textarea').val($('textarea').val() + oLst)
        $('.listAdd').fadeOut()
    }
}

function resetOrderedListCss() {
    $('#countOl').css('border-color', 'rgb(145, 160, 160)')
    $('#markOl').css('border-color', 'rgb(145, 160, 160)')
    $('.listForm .invalidInput').css('opacity', '0')
}

function resetOrderedList() {
    $('.listForm').eq(0).trigger('reset')
    $('#markOl').text('Choose OL type mark...')
    resetOrderedListCss()
}
//add unordered list
function addUList() {
    $('.listAdd').eq(1).fadeIn()
}

function showMarkUl() {
    $('.markUl').fadeIn()
}

function selectMarkUl() {
    event.preventDefault()
    $('#markUl').text($(this).text())
    $('.markUl').fadeOut()
}

function createUListHtml() {
    resetUnorderedListCss()
    let valid = true
    let count = $('#countUl').val()
    let mark = $('#markUl').text()
    if (!count) {
        valid = false
        $('#countUl').css('border-color', 'red')
        $('.listForm .invalidInput').css('opacity', '1')
    }
    if (mark == 'Choose UL type mark...') {
        valid = false
        $('#markUl').css('border-color', 'red')
        $('.listForm .invalidInput').css('opacity', '1')
    }
    if (valid) {
        let uLst = `<ul style="list-style-type:${mark};margin-left:20px">`
        for (let i = 0; i < count; i++) {
            uLst += `<li>item ${i}</li>`
        }
        uLst += '</ul>'
        $('textarea').val($('textarea').val() + uLst)
        $('.listAdd').fadeOut()
    }
}

function resetUnorderedListCss() {
    $('#countUl').css('border-color', 'rgb(145, 160, 160)')
    $('#markUl').css('border-color', 'rgb(145, 160, 160)')
    $('.listForm .invalidInput').css('opacity', '0')
}

function resetUnorderedList() {
    $('.listForm').eq(1).trigger('reset')
    $('#markUl').text('Choose UL type mark...')
    resetUnorderedListCss()
}

//Other functions
function closeForm3() { //used mostly for red close icon function
    $(event.target).parent().parent().parent().fadeOut()
}
function closeForm2() {
    $(event.target).parent().parent().fadeOut()
}
function closeForm1() {
    $(event.target).parent().fadeOut()
}