<%@ page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" %>
<!DOCTYPE html>
<html>
<head>
    <title>Лабораторная 1</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <style>
        th {
            font: monospace;
            font-size: large;
            color: #005552;
        }

        .inp {
            margin: 5px;
        }

        body {
            font-family: Arial, Helvetica, sans-serif;
        }

        table, th, td {
            border: 1px dotted;
        }

        td span{                    /*потомки*/
            color: crimson;
        }

        div#result {
            align-self: auto;
            overflow: auto;
            max-height: 400px;
        }

        div > table{                /*дочерние*/
            width: 100%;
        }

        td#result {
            vertical-align: top;
            width: 40%;
        }

        button.button {
            background: rgb(212, 164, 164);
            border: 1px dotted red;
        }

        button:hover {
            transform: scale(0.9);
        }
    </style>
</head>
<body>
<table width="100%" cellpadding="10" cellspacing="0">
    <th colspan="3">
        Гараев Раиль Фаннурович <br>
        Группа P32111 <br>
        Вариант 209104
    </th>
    <tr>
        <td colspan="2">
            <canvas id="graph" height="211px" width="211px"></canvas>
        </td>
        <td rowspan="0" id="result">
            <div id="result">
                <table class="results">
                    <tr>
                        <td>X</td>
                        <td>Y</td>
                        <td>R</td>
                        <td>Попадание</td>
                        <td>Время</td>
                        <td>Время исполнения скрипта</td>
                    </tr>
                </table>
            </div>
        </td>
    </tr>
    <form method="get" class="formWithValidation">
        <tr>
            <td>Выберите X:</td>
            <td>
                <input class="x inp" type="text" placeholder="От -3 до 5" maxlength="6">
                <span class="error x"></span>
            </td>
        </tr>
        <tr>
            <td>Введите Y:</td>
            <td>
                <select id="y_select">
                    <option class="y inp" value="-4">-4</option>
                    <option class="y inp" value="-3">-3</option>
                    <option class="y inp" value="-2">-2</option>
                    <option class="y inp" value="-1">-1</option>
                    <option class="y inp" value="0">0</option>
                    <option class="y inp" value="1">1</option>
                    <option class="y inp" value="2">2</option>
                    <option class="y inp" value="3">3</option>
                    <option class="y inp" value="4">4</option>
                </select>
                <span class="error y"></span>
            </td>
        </tr>
        <tr>
            <td>Выберите R:</td>
            <td>
                <input type="radio" class="r inp" id="r1" name="r inp" value="1">
                <label for="r1">1</label>

                <input type="radio" class="r inp" id="r2" name="r inp" value="2">
                <label for="r2">2</label>

                <input type="radio" class="r inp" id="r3" name="r inp" value="3">
                <label for="r3">3</label>

                <input type="radio" class="r inp" id="r4" name="r inp" value="4">
                <label for="r4">4</label>

                <input type="radio" class="r inp" id="r5" name="r inp" value="5">
                <label for="r5">5</label>

                <span class="error r"></span>
            </td>
        </tr>
        <tr>
            <td colspan="2">
                <button class="submitBtn">Проверить попадание в область</button>
            </td>
        </tr>
    </form>
</table>
<script type="text/javascript" charset="utf-8">
    <%@include file="validation.js"%>
</script>
</body>
</html>