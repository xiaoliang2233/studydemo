<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>jquerytodolist</title>
    <script type="text/javascript" src="../assets/js/jquery.js"></script>
    <link rel="stylesheet" href="../assets/css/public.css">

</head>

<body>
    <div>
        <div class="title">
            <span>todos</span>
        </div>
        <div class="app">

            <div class="todoinput">
                <input type="checkbox" name="" id="" class="todolistSelectAll" onclick="todolistSelectAll(this)">
                <input type="text" name="" id="" class="userinput" placeholder="What needs to be done?">
            </div>
            <div class="todolist">
                <div class="listinfo">
                    <ul>
                        <li>
                            <input type="checkbox" name="" id="" class="todoCheck">
                            <span>asdasd</span>
                            <button class="delete">x</button>
                        </li>
                        <li>
                            <input type="checkbox" name="" id="" class="todoCheck">
                            <span>asdasdadaasdasdadaasdasdadaasdasdadaasdasdadaasdasdada</span>
                            <button class="delete">x</button>
                        </li>
                        <li>
                            <input type="text" name="" id="" class="userChangeTodo">
                        </li>
                        <li>
                            <div>
                                <input type="checkbox" name="" id="" class="todoCheck">
                                <span>asdasd</span>
                                <button class="delete">x</button>
                            </div>

                            <input type="text" name="" id="" class="userChangeTodo" style="display: block">
                        </li>
                        <li class="todoOver">
                            <input type="checkbox" name="" id="" class="todoCheck">
                            <span>asdasd</span>
                            <button class="delete">x</button>
                        </li>
                    </ul>
                </div>
                <div class="listbutton">
                    <span>5 items left</span>
                    <button>All</button>
                    <button>Active</button>
                    <button>Completed</button>
                    <a onclick="deleteTodoList()">Clear completed</a>
                </div>
            </div>
        </div>
    </div>


    <script type="text/javascript">
        // var todolistData = [{
        //     text: '1',
        //     checkStatus: false,
        // }, {
        //     text: '2',
        //     checkStatus: false,
        // }, {
        //     text: '3',
        //     checkStatus: false,
        // }, {
        //     text: '4',
        //     checkStatus: true,
        // }, ];
        var todolistData = [];
        var editing;
        var listbuttonStatus = 'All';
        // document.ready = function() {
        //     todolistData = JSON.parse(window.localStorage.getItem("todolist"));
        //     showTodolist(todolistData);
        // }
        $(document).ready(function() {
            if (JSON.parse(window.localStorage.getItem("todolist"))) {
                todolistData = JSON.parse(window.localStorage.getItem("todolist"));
            }
            showTodolist(todolistData);
        })

        function showTodolist() {
            $('.listinfo').empty();
            $('.todolist').hide();
            // todolistData = JSON.parse(window.localStorage.getItem("todolist"));
            if (todolistData && todolistData.length > 0) {
                $('.todolist').show();
                let strHtml = '';
                todolistData.map(function(item, index) {
                    let checkboxStatus = item.checkStatus ? 'checked' : '';
                    let listyle = item.checkStatus ? 'todoOver' : '';
                    strHtml += `<li class = "${listyle}" number = "${index}">
                            <div>
                                <input type="checkbox" name="" id="" class="todoCheck" ${checkboxStatus}>
                                <span>${item.text}</span>
                                <button class="delete">x</button>
                            </div>
                            <input type="text" name="" id="" class="userChangeTodo" style="display: none">
                        </li>`;
                })
                $('.listinfo').append(strHtml);
                document.querySelector('.listbutton span').innerText = todolistData.length + ' items left';
            }
            localStorage.setItem("todolist", JSON.stringify(todolistData));
        }
        $('.listinfo').on('click', '.todoCheck', function(e) {
            console.log(e);
            console.log('todocheck');
            const ele = e.target.parentElement.parentElement;
            const eleindex = ele.getAttribute('number');
            if (e.target.checked) {
                $(ele).addClass('todoOver');
            } else {
                $(ele).removeClass('todoOver');
            }
            todolistData[eleindex].checkStatus = e.target.checked;
            localStorage.setItem("todolist", JSON.stringify(todolistData));
        })

        $('.listinfo').on('click', 'button', function(e) {
            const ele = e.target.parentElement.parentElement;
            const eleindex = ele.getAttribute('number');
            todolistData.splice(eleindex, 1);
            showTodolist(todolistData);
        })

        $('.listinfo').on('dblclick', 'span', function(e) {
            const ele = e.target.parentElement.parentElement;
            editing = ele.getAttribute('number');
            const thisele = document.querySelectorAll('.listinfo li>input')[editing];
            $(document.querySelectorAll('.listinfo div')[editing]).hide();
            $(thisele).show();
            thisele.value = todolistData[editing].text;
            $(thisele).focus(function() { //focus
                $(thisele).blur(function(e) {
                    const value = document.querySelectorAll('.listinfo li>input')[editing].value;
                    if (value.replace(/(^\s*)|(\s*$)/g, '')) {
                        $(document.querySelectorAll('.listinfo div')[editing]).show();
                        todolistData[editing].text = document.querySelectorAll('.listinfo li>input')[editing].value;
                    }
                    showTodolist(todolistData);
                })
                $(thisele).bind("keypress", function(event) {
                    const value = document.querySelectorAll('.listinfo li>input')[editing].value;
                    if (event.keyCode == "13" && value.replace(/(^\s*)|(\s*$)/g, '')) {
                        todolistData[editing].text = document.querySelectorAll('.listinfo li>input')[editing].value;
                        showTodolist(todolistData);
                    }
                });
            });
            // document.querySelectorAll('.listinfo li>input')[eleindex].blur(function() {
            //     console.log('asdasdasd')

            // });

        })


        $(".userinput").bind("keypress", function(event) {
            if (event.keyCode == "13" && $(".userinput").val().replace(/(^\s*)|(\s*$)/g, '')) {
                const value = $(".userinput").val();
                const todo = {
                    checkStatus: false,
                    text: value
                }
                todolistData.push(todo);
                showTodolist(todolistData);
                $(".userinput").val('')
            }

        });

        function todolistSelectAll(ele) {
            for (let i = 0; i < todolistData.length; i++) {
                todolistData[i].checkStatus = ele.checked; //ele.checked
            }
            showTodolist(todolistData);
        }

        $('.listbutton').on('click', 'button', function(e) {
            console.log(e.target);
            const ele = e.target;
            switch (ele.innerText) {
                case 'All':
                    $('.listinfo li').show();
                    break;
                case 'Active':
                    $('.listinfo li').hide();
                    $('.listinfo .todoOver').show();
                    break;
                case 'Completed':
                    $('.listinfo li').show();
                    $('.listinfo .todoOver').hide();
                    break;
                default:
                    break;
            }
        })

        function deleteTodoList() {
            todolistData = [];
            showTodolist(todolistData);
        }
    </script>
</body>

</html>