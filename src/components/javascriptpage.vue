<template>
   <div>
        <div class="title">
            <span>todos</span>
        </div>
        <div class="app">

            <div class="todoinput">
                <input type="checkbox" name="" id="" class="todolistSelectAll" onclick="todolistSelectAll(this)">
                <input type="text" onkeydown="keyup_submit(event)" name="" id="userinput" class="userinput" placeholder="What needs to be done?">
            </div>
            <div class="todolist" id="todolist">
                <div class="listinfo" id="listinfo">
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
                    <a>Clear completed</a>
                </div>
            </div>
        </div>
    </div>
</template>

   
<script>



        var todolistData = [];
        var editing;
        var listbuttonStatus = 'All';
        window.onload = function() {
            if (JSON.parse(window.localStorage.getItem("todolist "))) {
                todolistData = JSON.parse(window.localStorage.getItem("todolist "));
            }
            showTodolist(todolistData);
        }
        var $ = function(el) {
            return document.querySelectorAll(el);
        }

        function createli(classname, number) {
            var eleli = document.createElement('li');
            eleli.classList.add('classname');
            eleli.setAttribute('number', number);
            return eleli;
        }

        function createli(dom, listyle, index, status, text) {
            var eleli = document.createElement('li');
            dom.appendChild(eleli);
            if (listyle)
                eleli.classList.add('todoOver');
            eleli.setAttribute('number', index);
            var elediv = document.createElement('div');
            eleli.appendChild(elediv);
            var elecheckbox = document.createElement('input');
            elecheckbox.type = 'checkbox';
            elecheckbox.classList.add('todoCheck');
            elecheckbox.checked = status;
            elecheckbox.onclick = aaa();
            elediv.appendChild(elecheckbox);
            var elespan = document.createElement('span');
            elespan.innerHTML = text;
            elediv.appendChild(elespan);
            var elebtn = document.createElement('button');
            elebtn.innerHTML = 'x';
            elebtn.classList.add('delete');
            elediv.appendChild(elebtn);
            var elechangeinput = document.createElement('input');
            elechangeinput.type = 'text';
            elechangeinput.classList.add('userChangeTodo');
            elechangeinput.style.display = 'none';
            eleli.appendChild(elechangeinput);
        }

        function showTodolist() {
            var ele = document.querySelector('.listinfo');
            var eleul = document.querySelector('ul');
            eleul.parentNode.removeChild(eleul);
            var eleul1 = document.createElement('ul');
            document.getElementById("listinfo").appendChild(eleul1);
            document.getElementById("todolist").style.display = "none ";
            if (todolistData && todolistData.length > 0) {
                document.getElementById("todolist").style.display = "block ";
                todolistData.map(function(item, index) {
                    let checkboxStatus = item.checkStatus ? 'checked' : '';
                    let listyle = item.checkStatus ? 'todoOver' : '';

                    createli(document.querySelector('ul'), listyle, index, item.checkStatus, item.text);

                });
                document.querySelector('.listbutton span').innerText = todolistData.length + ' items left';
            }
            localStorage.setItem("todolist ", JSON.stringify(todolistData));
        }

        function keyup_submit(event) {
            if (event.keyCode == "13 " && document.querySelector('.userinput').value.replace(/(^\s*)|(\s*$)/g, '')) {
                const value = document.querySelector('.userinput').value;
                const todo = {
                    checkStatus: false,
                    text: value
                }
                todolistData.push(todo);
                showTodolist(todolistData);
                document.querySelector('.userinput').value = '';
            }

        };

        function todolistSelectAll(ele) {
            for (let i = 0; i < todolistData.length; i++) {
                todolistData[i].checkStatus = ele.checked; //ele.checked
            }
            showTodolist(todolistData);
        }
        document.addEventListener('dblclick', function(event) {
            var target = event.target;
            if (event.target.nodeName == 'SPAN') {

                const number = target.parentElement.parentElement.getAttribute('number');
                editing = number;
                const thisele = document.querySelectorAll('.listinfo li>input')[number];
                document.querySelectorAll('.listinfo div')[number].style.display = 'none'
                thisele.style.display = 'block';
                thisele.value = todolistData[number].text;
                thisele.focus(function() {
                    thisele.addEventListener('keypress', function(event) {
                        const value = document.querySelectorAll('.listinfo li>input')[editing].value;
                        console.log(value);
                    })
                });
            }
        });
        document.addEventListener('click', function(event) {
            var target = event.target;
            console.log(target)
            let number;
            switch (target.nodeName) {
                case "INPUT":
                    if (target.type == 'text') {
                        break;
                    }
                    number = target.parentElement.parentElement.getAttribute('number');
                    if (target.checked) {
                        target.parentElement.parentElement.classList.add('todoOver');
                    } else {
                        target.parentElement.parentElement.classList.remove('todoOver');
                    }
                    todolistData[number].checkStatus = target.checked;
                    localStorage.setItem("todolist ", JSON.stringify(todolistData));
                    showTodolist(todolistData);
                    break;
                case "A":
                    todolistData = [];
                    showTodolist(todolistData);
                    break;
                case "BUTTON":
                    if (target.innerText == 'x') {
                        number = target.parentElement.parentElement.getAttribute('number');
                        todolistData.splice(number, 1);
                        showTodolist(todolistData);
                    } else {
                        switch (target.innerText) {
                            case 'All':
                                $('.listinfo li').forEach(function(item) {
                                    item.style.display = 'block'
                                });
                                break;
                            case 'Active':
                                $('.listinfo li').forEach(function(item) {
                                    item.style.display = 'none'
                                });
                                $('.listinfo .todoOver').forEach(function(item) {
                                    item.style.display = 'block'
                                });

                                break;
                            case 'Completed':
                                $('.listinfo li').forEach(function(item) {
                                    item.style.display = 'block'
                                });
                                $('.listinfo .todoOver').forEach(function(item) {
                                    item.style.display = 'none'
                                });
                                break;
                            default:
                                break;
                        }
                    }
                    break;
                default:
                    break;
            }

        });
    </script>
