//根据DOM元素的id构造出一个编辑器================================================================================================================================================================================================
// var editor = CodeMirror.fromTextArea(document.getElementById("code"), {
//     mode: "application/json", //设置json模式
//     lineNumbers: true, //是否显示左边换行术字
//     lineWrapping: true, //是否折叠
//     foldGutter: true,
//     gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"]
// });



// $('#tb_clear').click(function () {
//     editor.setValue('');
// });

TCODES={
    "1":"import turtle\n" +
        "print(\"开始绘制正方形\")\n" +
        "# 创建一个Turtle对象\n" +
        "pen = turtle.Turtle()\n" +
        "pen.shape(\"turtle\")\n" +
        "pen.penup()\n" +
        "pen.goto(-50, -50)  # 居中位置\n" +
        "pen.pendown()\n" +
        "# 设置填充颜色\n" +
        "pen.fillcolor(\"blue\")\n" +
        "pen.begin_fill()  # 开始填充\n" +
        "# 绘制四边形\n" +
        "for _ in range(4):\n" +
        "    pen.forward(100)  # 前进100个像素\n" +
        "    pen.left(90)      # 左转90度\n" +
        "    print(\"绘制边\")\n" +
        "\n" +
        "pen.end_fill()  # 结束填充\n" +
        "print(\"绘制完成\")\n" +
        "# 关闭窗口时才会退出\n" +
        "# 隐藏画笔\n" +
        "pen.hideturtle()\n" +
        "turtle.done()",
    "2":"import turtle\n" +
        "print(\"开始绘制同心圆\")\n" +
        "# 创建Turtle对象\n" +
        "pen = turtle.Turtle()\n" +
        "pen.shape(\"turtle\")\n" +
        "# 移动画笔到居中位置\n" +
        "pen.pensize(2) #设置外花边的大小\n" +
        "# 设置填充颜色\n" +
        "pen.fillcolor(\"green\")\n" +
        "\n" +
        "# 绘制圆形\n" +
        "for i in range(10,150,20):\n" +
        "    pen.penup()\n" +
        "    pen.goto(0, -1*i)  # 居中位置\n" +
        "    pen.pendown()\n" +
        "    pen.circle(i)  # 半径为150\n" +
        "    print(\"绘制半径为%d的圆\"%i)\n" +
        "\n" +
        "# 隐藏画笔\n" +
        "pen.hideturtle()\n" +
        "print(\"绘制完成\")\n" +
        "# 显示绘图窗口\n" +
        "# 隐藏画笔\n" +
        "pen.hideturtle()\n" +
        "turtle.done()",
    "3":"import turtle\n" +
        "print(\"开始绘制五角星\")\n" +
        "\n" +
        "# 设置画布尺寸\n" +
        "screen = turtle.Screen()\n" +
        "screen.setup(width=300, height=300)\n" +
        "\n" +
        "# 创建Turtle对象\n" +
        "pen = turtle.Turtle()\n" +
        "pen.shape(\"turtle\")\n" +
        "\n" +
        "# 移动画笔到起始位置\n" +
        "pen.penup()\n" +
        "pen.goto(-72, -100)  # 居中位置\n" +
        "pen.pendown()\n" +
        "\n" +
        "# 设置画笔宽度\n" +
        "pen.width(2)\n" +
        "\n" +
        "# 设置边框颜色和填充颜色\n" +
        "pen.color(\"red\", \"yellow\")\n" +
        "\n" +
        "# 开始填充\n" +
        "pen.begin_fill()\n" +
        "\n" +
        "# 绘制五角星\n" +
        "pen.left(72)  # 调整初始角度\n" +
        "for _ in range(5):\n" +
        "    pen.forward(240)  # 边长\n" +
        "    pen.right(144)     # 旋转144度\n" +
        "    print(\"绘制边\")\n" +
        "\n" +
        "# 结束填充\n" +
        "pen.end_fill()\n" +
        "pen.right(36)     \n" +
        "pen.forward(240)  # 边长\n" +
        "print(\"补最后一个边\")\n" +
        "\n" +
        "# 隐藏画笔\n" +
        "pen.hideturtle()\n" +
        "print(\"绘制完成\")\n" +
        "# 显示绘图窗口\n" +
        "turtle.done()\n",
    "4":"import turtle\n" +
        "print(\"开始绘制奥运五环\")\n" +
        "\n" +
        "# 创建Turtle对象\n" +
        "pen = turtle.Turtle()\n" +
        "pen.shape(\"turtle\")\n" +
        "pen.pensize(8)\n" +
        "\n" +
        "print(\"绘制蓝色圆\")\n" +
        "pen.up()\n" +
        "pen.goto(50-170,0)\n" +
        "pen.down()\n" +
        "pen.color('blue')\n" +
        "pen.circle(50)\n" +
        "print(\"绘制黑色圆\")\n" +
        "pen.up()\n" +
        "pen.goto(170-170,0)\n" +
        "pen.down()\n" +
        "pen.color('black')\n" +
        "pen.circle(50)\n" +
        "print(\"绘制红色圆\")\n" +
        "pen.up()\n" +
        "pen.goto(290-170,0)\n" +
        "pen.down()\n" +
        "pen.color('red')\n" +
        "pen.circle(50)\n" +
        "print(\"绘制黄色圆\")\n" +
        "pen.up()\n" +
        "pen.goto(110-170,-60)\n" +
        "pen.down()\n" +
        "pen.color('yellow')\n" +
        "pen.circle(50)\n" +
        "print(\"绘制绿色圆\")\n" +
        "pen.up()\n" +
        "pen.goto(230-170,-60)\n" +
        "pen.down()\n" +
        "pen.color('green')\n" +
        "pen.circle(50)\n" +
        "print(\"绘制完成\")\n" +
        "# 隐藏画笔\n" +
        "pen.hideturtle()\n" +
        "turtle.done()",
    "5":"import turtle\n" +
        "print(\"开始绘制棋盘\")\n" +
        "\n" +
        "# 设置画布尺寸\n" +
        "screen = turtle.Screen()\n" +
        "#screen.setup(width=600, height=600)\n" +
        "\n" +
        "# 创建Turtle对象\n" +
        "pen = turtle.Turtle()\n" +
        "\n" +
        "# 设置画笔宽度\n" +
        "pen.width(2)\n" +
        "\n" +
        "pen.speed(\"100\")\n" +
        "\n" +
        "# 移动画笔到左上角起始位置\n" +
        "pen.penup()\n" +
        "pen.goto(-160, 160)  # 左上角起始位置\n" +
        "pen.pendown()\n" +
        "\n" +
        "# 绘制国际象棋棋盘\n" +
        "for row in range(8):\n" +
        "    for column in range(8):\n" +
        "        if (row + column) % 2 == 0:\n" +
        "            pen.fillcolor(\"white\")\n" +
        "        else:\n" +
        "            pen.fillcolor(\"black\")\n" +
        "        \n" +
        "        # 开始填充\n" +
        "        pen.begin_fill()\n" +
        "        \n" +
        "        # 绘制方格\n" +
        "        for _ in range(4):\n" +
        "            pen.forward(40)  # 方格边长为40\n" +
        "            pen.right(90)\n" +
        "        \n" +
        "        # 结束填充\n" +
        "        pen.end_fill()\n" +
        "        \n" +
        "        # 移动到下一个方格的位置\n" +
        "        pen.penup()\n" +
        "        pen.forward(40)\n" +
        "        pen.pendown()\n" +
        "    \n" +
        "    # 移动到下一行的起始位置\n" +
        "    pen.penup()\n" +
        "    pen.goto(-160, pen.ycor() - 40)\n" +
        "    pen.pendown()\n" +
        "    print(\"绘制%d行\"%(row+1))\n" +
        "# 隐藏画笔\n" +
        "pen.hideturtle()\n" +
        "print(\"绘制完成\")\n" +
        "# 显示绘图窗口\n" +
        "turtle.done()\n",
    "6":"import turtle\n" +
        "\n" +
        "pen = turtle.Turtle()\n" +
        "pen.pensize(3) #设置线条粗细\n" +
        "print(\"开始绘制玫瑰花\")\n" +
        "# 设置初始位置\n" +
        "pen.penup()\n" +
        "pen.left(90)\n" +
        "pen.fd(200)\n" +
        "pen.pendown()\n" +
        "pen.right(90)\n" +
        "\n" +
        "print(\"绘制花蕊\")\n" +
        "# 花蕊\n" +
        "pen.fillcolor(\"red\")\n" +
        "pen.begin_fill()\n" +
        "pen.circle(10,180)\n" +
        "pen.circle(25,110)\n" +
        "pen.left(50)\n" +
        "pen.circle(60,45)\n" +
        "pen.circle(20,170)\n" +
        "pen.right(24)\n" +
        "pen.fd(30)\n" +
        "pen.left(10)\n" +
        "pen.circle(30,110)\n" +
        "pen.fd(20)\n" +
        "pen.left(40)\n" +
        "pen.circle(90,70)\n" +
        "pen.circle(30,150)\n" +
        "pen.right(30)\n" +
        "pen.fd(15)\n" +
        "pen.circle(80,90)\n" +
        "pen.left(15)\n" +
        "pen.fd(45)\n" +
        "pen.right(165)\n" +
        "pen.fd(20)\n" +
        "pen.left(155)\n" +
        "pen.circle(150,80)\n" +
        "pen.left(50)\n" +
        "pen.circle(150,90)\n" +
        "pen.end_fill()\n" +
        "\n" +
        "print(\"绘制花瓣\")\n" +
        "# 花瓣1\n" +
        "pen.left(150)\n" +
        "pen.circle(-90,70)\n" +
        "pen.left(20)\n" +
        "pen.circle(75,105)\n" +
        "pen.setheading(60)\n" +
        "pen.circle(80,98)\n" +
        "pen.circle(-90,40)\n" +
        " \n" +
        "# 花瓣2\n" +
        "pen.left(180)\n" +
        "pen.circle(90,40)\n" +
        "pen.circle(-80,98)\n" +
        "pen.setheading(-83)\n" +
        " \n" +
        "print(\"绘制第一片叶子\")\n" +
        "# 叶子1\n" +
        "pen.fd(30)\n" +
        "pen.left(90)\n" +
        "pen.fd(25)\n" +
        "pen.left(45)\n" +
        "pen.fillcolor(\"green\")\n" +
        "pen.begin_fill()\n" +
        "pen.circle(-80,90)\n" +
        "pen.right(90)\n" +
        "pen.circle(-80,90)\n" +
        "pen.end_fill()\n" +
        " \n" +
        "pen.right(135)\n" +
        "pen.fd(60)\n" +
        "pen.left(180)\n" +
        "pen.fd(85)\n" +
        "pen.left(90)\n" +
        "pen.fd(80)\n" +
        "\n" +
        "print(\"绘制第二片叶子\")\n" +
        "# 叶子2\n" +
        "pen.right(90)\n" +
        "pen.right(45)\n" +
        "pen.fillcolor(\"green\")\n" +
        "pen.begin_fill()\n" +
        "pen.circle(80,90)\n" +
        "pen.left(90)\n" +
        "pen.circle(80,90)\n" +
        "pen.end_fill()\n" +
        " \n" +
        "print(\"绘制枝\")\n" +
        "pen.left(135)\n" +
        "pen.fd(60)\n" +
        "pen.left(180)\n" +
        "pen.fd(60)\n" +
        "pen.right(90)\n" +
        "pen.circle(200,60)\n" +
        "\n" +
        "# 隐藏画笔\n" +
        "pen.hideturtle()\n" +
        "print(\"绘制完成\")",
    "7":"import turtle\n" +
        "print(\"开始绘制分形树\")\n" +
        "pen = turtle.Turtle()\n" +
        "def draw_branch(branch_length):\n" +
        "    if branch_length > 5:\n" +
        "        if branch_length > 10:\n" +
        "            pen.pensize(10)\n" +
        "            pen.color('brown')\n" +
        "        else:\n" +
        "            pen.pensize(5)\n" +
        "            pen.color('green')\n" +
        "        pen.forward(branch_length)\n" +
        "        #print('q',branch_length)\n" +
        "        pen.right(20)\n" +
        "        #print('right 20')\n" +
        "        draw_branch(branch_length-15)\n" +
        "\n" +
        "        pen.left(40)\n" +
        "        #print('left 40')\n" +
        "        draw_branch(branch_length-15)\n" +
        "\n" +
        "        #print('right 20')\n" +
        "        pen.right(20)\n" +
        "\n" +
        "        pen.penup()\n" +
        "        pen.backward(branch_length)\n" +
        "        pen.pendown()\n" +
        "        \n" +
        "        print(\"绘制完某个节点\")\n" +
        "\n" +
        "        #print('back',branch_length)\n" +
        "def main():\n" +
        "    pen.left(90)\n" +
        "    pen.penup()\n" +
        "    pen.backward(200)\n" +
        "    pen.pendown()\n" +
        "    pen.color('brown')\n" +
        "    #print('left 90')\n" +
        "    pen.speed(1000)\n" +
        "    draw_branch(100);\n" +
        "    # 隐藏画笔\n" +
        "    pen.hideturtle()\n" +
        "    print(\"绘制完成\")\n" +
        "if __name__ == '__main__':\n" +
        "    main()",
    "8":"import turtle\n" +
        "\n" +
        "pen = turtle.Turtle()\n" +
        "\n" +
        "print(\"开始绘制太极\")\n" +
        "\n" +
        "radius = 100\n" +
        "pen.color(\"black\", \"black\")\n" +
        "pen.begin_fill()\n" +
        "pen.circle(radius/2, 180)\n" +
        "pen.circle(radius, 180)\n" +
        "pen.left(180)\n" +
        "pen.circle(-radius/2, 180)\n" +
        "pen.end_fill() \n" +
        "\n" +
        "\n" +
        "pen.left(90)\n" +
        "pen.pu()\n" +
        "pen.fd(radius*0.35)\n" +
        "pen.right(90)\n" +
        "pen.pd()\n" +
        "\n" +
        "print(\"绘制小圆\")\n" +
        "pen.color(\"white\", \"white\")\n" +
        "pen.begin_fill()\n" +
        "pen.circle(radius*0.15)\n" +
        "pen.end_fill() \n" +
        "\n" +
        "\n" +
        "pen.left(90)\n" +
        "pen.up()\n" +
        "pen.backward(radius*0.7)\n" +
        "pen.down()\n" +
        "pen.left(90)\n" +
        "\n" +
        "print(\"绘制小圆\")\n" +
        "pen.color(\"black\", \"black\")\n" +
        "pen.begin_fill()\n" +
        "pen.circle(radius*0.15)\n" +
        "pen.end_fill()\n" +
        "\n" +
        "print(\"补大圆\")\n" +
        "pen.right(90)\n" +
        "pen.pu()\n" +
        "pen.backward(radius*0.65)\n" +
        "pen.right(90)\n" +
        "pen.pd()\n" +
        "pen.circle(radius, 180)\n" +
        "print(\"绘制完成\")\n" +
        "pen.ht()",
    "9":"import turtle\n" +
        "print(\"开始绘制小猪佩奇\")\n" +
        "pen = turtle.Turtle()\n" +
        "pen.pensize(4)\n" +
        "#pen.hideturtle()\n" +
        "\n" +
        "#pen.speed(1000)\n" +
        "\n" +
        "pen.color(\"#ff9bc0\",\"pink\")\n" +
        "pen.setheading(-30)\n" +
        "pen.pu()\n" +
        "pen.goto(-100,100)\n" +
        "pen.begin_fill()\n" +
        "pen.pd()\n" +
        "a=0.4\n" +
        "print(\"绘制鼻子\")\n" +
        "for  i  in  range(120):\n" +
        "    if  0<=i<30  or  60<=i<90:\n" +
        "        a=a+0.08\n" +
        "        pen.lt(3)\n" +
        "        pen.fd(a)\n" +
        "    else:\n" +
        "        a=a-0.08\n" +
        "        pen.lt(3)\n" +
        "        pen.fd(a)\n" +
        "pen.end_fill()\n" +
        "pen.pu()\n" +
        "pen.seth(90)\n" +
        "pen.fd(25)\n" +
        "pen.setheading(0)\n" +
        "pen.fd(10)\n" +
        "pen.begin_fill()\n" +
        "pen.pd()\n" +
        "pen.circle(5)\n" +
        "pen.color(\"#A0522D\")\n" +
        "pen.end_fill()\n" +
        "pen.pu()\n" +
        "pen.seth(0)\n" +
        "pen.fd(20)\n" +
        "pen.pd()\n" +
        "pen.pencolor(\"#ff9bc0\")\n" +
        "pen.begin_fill()\n" +
        "pen.circle(5)\n" +
        "pen.color(\"#A0522D\")\n" +
        "pen.end_fill()\n" +
        "\n" +
        "print(\"绘制头部\")\n" +
        "pen.color(\"#ff9bc0\",\"pink\")\n" +
        "pen.pu()\n" +
        "pen.seth(90)\n" +
        "pen.fd(41)\n" +
        "pen.seth(0)\n" +
        "pen.pd()\n" +
        "pen.begin_fill()\n" +
        "pen.seth(0)\n" +
        "pen.circle(-300,30)\n" +
        "pen.circle(-100,60)\n" +
        "pen.circle(-80,100)\n" +
        "pen.circle(-150,20)\n" +
        "pen.circle(-60,95)\n" +
        "pen.seth(161)\n" +
        "pen.circle(-300,15)\n" +
        "pen.pu()\n" +
        "pen.goto(-100,100)\n" +
        "pen.pd()\n" +
        "pen.seth(-30)\n" +
        "a=0.4\n" +
        "\n" +
        "\n" +
        "\n" +
        "for  i  in  range(60):\n" +
        "    if  0<=i<30:\n" +
        "        a=a+0.08\n" +
        "        pen.lt(3)\n" +
        "        pen.fd(a)\n" +
        "    else:\n" +
        "        a=a-0.08\n" +
        "        pen.lt(3)\n" +
        "        pen.fd(a)\n" +
        "pen.end_fill()\n" +
        "\n" +
        "print(\"绘制耳朵\")\n" +
        "pen.color(\"#ff9bc0\",\"pink\")\n" +
        "pen.pu()\n" +
        "pen.seth(90)\n" +
        "pen.fd(-7)\n" +
        "pen.seth(0)\n" +
        "pen.fd(70)\n" +
        "pen.pd()\n" +
        "pen.begin_fill()\n" +
        "pen.seth(100)\n" +
        "pen.circle(-50,50)\n" +
        "pen.circle(-10,120)\n" +
        "pen.circle(-50,54)\n" +
        "pen.end_fill()\n" +
        "pen.pu()\n" +
        "pen.seth(90)\n" +
        "pen.fd(-12)\n" +
        "pen.seth(0)\n" +
        "pen.fd(30)\n" +
        "pen.pd()\n" +
        "pen.begin_fill()\n" +
        "pen.seth(100)\n" +
        "pen.circle(-50,50)\n" +
        "pen.circle(-10,120)\n" +
        "pen.circle(-50,56)\n" +
        "pen.end_fill()\n" +
        "\n" +
        "pen.color(\"#ff9bc0\",\"white\")\n" +
        "pen.pu()\n" +
        "print(\"绘制眼睛\")\n" +
        "pen.seth(90)\n" +
        "pen.fd(-20)\n" +
        "pen.seth(0)\n" +
        "pen.fd(-95)\n" +
        "pen.pd()\n" +
        "pen.begin_fill()\n" +
        "pen.circle(15)\n" +
        "pen.end_fill()\n" +
        "pen.color(\"black\")\n" +
        "pen.pu()\n" +
        "pen.seth(90)\n" +
        "pen.fd(12)\n" +
        "pen.seth(0)\n" +
        "pen.fd(-3)\n" +
        "pen.pd()\n" +
        "pen.begin_fill()\n" +
        "pen.circle(3)\n" +
        "pen.end_fill()\n" +
        "pen.color(\"#ff9bc0\",\"white\")\n" +
        "pen.pu()\n" +
        "pen.seth(90)\n" +
        "pen.fd(-25)\n" +
        "pen.seth(0)\n" +
        "pen.fd(40)\n" +
        "pen.pd()\n" +
        "pen.begin_fill()\n" +
        "pen.circle(15)\n" +
        "pen.end_fill()\n" +
        "pen.color(\"black\")\n" +
        "pen.pu()\n" +
        "pen.seth(90)\n" +
        "pen.fd(12)\n" +
        "pen.seth(0)\n" +
        "pen.fd(-3)\n" +
        "pen.pd()\n" +
        "pen.begin_fill()\n" +
        "pen.circle(3)\n" +
        "pen.end_fill()\n" +
        "\n" +
        "\n" +
        "print(\"绘制脸\")\n" +
        "pen.color(\"#ff9bc0\")\n" +
        "pen.pu()\n" +
        "pen.seth(90)\n" +
        "pen.fd(-95)\n" +
        "pen.seth(0)\n" +
        "pen.fd(65)\n" +
        "pen.pd()\n" +
        "pen.begin_fill()\n" +
        "pen.circle(30)\n" +
        "pen.end_fill()\n" +
        "\n" +
        "print(\"绘制嘴巴\")\n" +
        "pen.color(\"#EF4513\")\n" +
        "pen.pu()\n" +
        "pen.seth(90)\n" +
        "pen.fd(15)\n" +
        "pen.seth(0)\n" +
        "pen.fd(-100)\n" +
        "pen.pd()\n" +
        "pen.seth(-80)\n" +
        "pen.circle(30,40)\n" +
        "pen.circle(40,80)\n" +
        "\n" +
        "print(\"绘制身体\")\n" +
        "pen.color(\"red\",\"#FF6347\")\n" +
        "pen.pu()\n" +
        "pen.seth(90)\n" +
        "pen.fd(-20)\n" +
        "pen.seth(0)\n" +
        "pen.fd(-78)\n" +
        "pen.pd()\n" +
        "pen.begin_fill()\n" +
        "pen.seth(-130)\n" +
        "pen.circle(100,10)\n" +
        "pen.circle(300,30)\n" +
        "pen.seth(0)\n" +
        "pen.fd(230)\n" +
        "pen.seth(90)\n" +
        "pen.circle(300,30)\n" +
        "pen.circle(100,3)\n" +
        "pen.color(\"#FF9BC0\",\"#FF6464\")\n" +
        "pen.seth(-135)\n" +
        "pen.circle(-80,63)\n" +
        "pen.circle(-150,24)\n" +
        "pen.end_fill()\n" +
        "\n" +
        "\n" +
        "\n" +
        "print(\"绘制胳膊\")\n" +
        "pen.color(\"#FF9BC0\")\n" +
        "pen.pu()\n" +
        "pen.seth(90)\n" +
        "pen.fd(-40)\n" +
        "pen.seth(0)\n" +
        "pen.fd(-27)\n" +
        "pen.pd()\n" +
        "pen.seth(-160)\n" +
        "pen.circle(300,15)\n" +
        "pen.pu()\n" +
        "pen.seth(90)\n" +
        "pen.fd(15)\n" +
        "pen.seth(0)\n" +
        "pen.fd(0)\n" +
        "pen.pd()\n" +
        "pen.seth(-10)\n" +
        "pen.circle(-20,90)\n" +
        "pen.pu()\n" +
        "pen.seth(90)\n" +
        "pen.fd(30)\n" +
        "pen.seth(0)\n" +
        "pen.fd(237)\n" +
        "pen.pd()\n" +
        "pen.seth(-20)\n" +
        "pen.circle(-300,15)\n" +
        "pen.pu()\n" +
        "pen.seth(90)\n" +
        "pen.fd(20)\n" +
        "pen.seth(0)\n" +
        "pen.fd(0)\n" +
        "pen.pd()\n" +
        "pen.seth(-170)\n" +
        "pen.circle(20,90)\n" +
        "\n" +
        "\n" +
        "print(\"绘制腿和脚\")\n" +
        "pen.pensize(10)\n" +
        "pen.color(\"#F08080\")\n" +
        "pen.pu()\n" +
        "pen.seth(90)\n" +
        "pen.fd(-75)\n" +
        "pen.seth(0)\n" +
        "pen.fd(-180)\n" +
        "pen.pd()\n" +
        "pen.seth(-90)\n" +
        "pen.fd(40)\n" +
        "pen.seth(-180)\n" +
        "pen.color(\"black\")\n" +
        "pen.pensize(15)\n" +
        "pen.fd(20)\n" +
        "pen.pensize(10)\n" +
        "pen.color(\"#F08080\")\n" +
        "pen.pu()\n" +
        "pen.seth(90)\n" +
        "pen.fd(40)\n" +
        "pen.seth(0)\n" +
        "pen.fd(90)\n" +
        "pen.pd()\n" +
        "pen.seth(-90)\n" +
        "pen.fd(40)\n" +
        "pen.seth(-180)\n" +
        "pen.color(\"black\")\n" +
        "pen.pensize(15)\n" +
        "pen.fd(20)\n" +
        "\n" +
        "\n" +
        "print(\"绘制尾巴\")\n" +
        "pen.pensize(4)\n" +
        "pen.color(\"#FF9BC0\")\n" +
        "pen.pu()\n" +
        "pen.seth(90)\n" +
        "pen.fd(70)\n" +
        "pen.seth(0)\n" +
        "pen.fd(95)\n" +
        "pen.pd()\n" +
        "pen.seth(0)\n" +
        "pen.circle(70,20)\n" +
        "pen.circle(10,330)\n" +
        "pen.circle(70,30)\n" +
        "pen.mainloop()\n" +
        "# 隐藏画笔\n" +
        "pen.hideturtle()\n" +
        "\n" +
        "print(\"绘制完成\")",
    "10":"import turtle\n" +
        "print(\"开始绘制皮卡丘\")\n" +
        "def getPosition(x, y):\n" +
        "    turtle.setx(x)\n" +
        "    turtle.sety(y)\n" +
        "    print(x, y)\n" +
        "\n" +
        "class Pikachu:\n" +
        "\n" +
        "    def __init__(self):\n" +
        "        self.t = turtle.Turtle()\n" +
        "        t = self.t\n" +
        "        t.pensize(3)\n" +
        "        t.speed(9)\n" +
        "        t.ondrag(getPosition)\n" +
        "\n" +
        "    def noTrace_goto(self, x, y):\n" +
        "        self.t.penup()\n" +
        "        self.t.goto(x, y)\n" +
        "        self.t.pendown()\n" +
        "\n" +
        "    def leftEye(self, x, y):\n" +
        "        print(\"绘制左眼\")\n" +
        "        self.noTrace_goto(x, y)\n" +
        "        t = self.t\n" +
        "        t.seth(0)\n" +
        "        t.fillcolor('#333333')\n" +
        "        t.begin_fill()\n" +
        "        t.circle(22)\n" +
        "        t.end_fill()\n" +
        "\n" +
        "        self.noTrace_goto(x, y + 10)\n" +
        "        t.fillcolor('#000000')\n" +
        "        t.begin_fill()\n" +
        "        t.circle(10)\n" +
        "        t.end_fill()\n" +
        "\n" +
        "        self.noTrace_goto(x + 6, y + 22)\n" +
        "        t.fillcolor('#ffffff')\n" +
        "        t.begin_fill()\n" +
        "        t.circle(10)\n" +
        "        t.end_fill()\n" +
        "\n" +
        "    def rightEye(self, x, y):\n" +
        "        print(\"绘制右眼\")\n" +
        "        self.noTrace_goto(x, y)\n" +
        "        t = self.t\n" +
        "        t.seth(0)\n" +
        "        t.fillcolor('#333333')\n" +
        "        t.begin_fill()\n" +
        "        t.circle(22)\n" +
        "        t.end_fill()\n" +
        "\n" +
        "        self.noTrace_goto(x, y + 10)\n" +
        "        t.fillcolor('#000000')\n" +
        "        t.begin_fill()\n" +
        "        t.circle(10)\n" +
        "        t.end_fill()\n" +
        "\n" +
        "        self.noTrace_goto(x - 6, y + 22)\n" +
        "        t.fillcolor('#ffffff')\n" +
        "        t.begin_fill()\n" +
        "        t.circle(10)\n" +
        "        t.end_fill()\n" +
        "\n" +
        "    def mouth(self, x, y):\n" +
        "        print(\"绘制嘴巴\")\n" +
        "        self.noTrace_goto(x, y)\n" +
        "        t = self.t\n" +
        "        t.fillcolor('#88141D')\n" +
        "        t.begin_fill()\n" +
        "\n" +
        "        # Lower Lip\n" +
        "        l1 = []\n" +
        "        l2 = []\n" +
        "        t.seth(190)\n" +
        "        a = 0.7\n" +
        "        for i in range(28):\n" +
        "            a += 0.1\n" +
        "            t.right(3)\n" +
        "            t.fd(a)\n" +
        "            l1.append(t.position())\n" +
        "\n" +
        "        self.noTrace_goto(x, y)\n" +
        "\n" +
        "        t.seth(10)\n" +
        "        a = 0.7\n" +
        "        for i in range(28):\n" +
        "            a += 0.1\n" +
        "            t.left(3)\n" +
        "            t.fd(a)\n" +
        "            l2.append(t.position())\n" +
        "\n" +
        "        # Upper Lip\n" +
        "        t.seth(10)\n" +
        "        t.circle(50, 15)\n" +
        "        t.left(180)\n" +
        "        t.circle(-50, 15)\n" +
        "\n" +
        "        t.circle(-50, 40)\n" +
        "        t.seth(233)\n" +
        "        t.circle(-50, 55)\n" +
        "        t.left(180)\n" +
        "        t.circle(50, 12.1)\n" +
        "        t.end_fill()\n" +
        "\n" +
        "        # Tongue\n" +
        "        self.noTrace_goto(17, 54)\n" +
        "        t.fillcolor('#DD716F')\n" +
        "        t.begin_fill()\n" +
        "        t.seth(145)\n" +
        "        t.circle(40, 86)\n" +
        "        t.penup()\n" +
        "        for pos in reversed(l1[:20]):\n" +
        "            t.goto(pos[0], pos[1] + 1.5)\n" +
        "        for pos in l2[:20]:\n" +
        "            t.goto(pos[0], pos[1] + 1.5)\n" +
        "        t.pendown()\n" +
        "        t.end_fill()\n" +
        "\n" +
        "        # Nose\n" +
        "        self.noTrace_goto(-17, 94)\n" +
        "        t.seth(8)\n" +
        "        t.fd(4)\n" +
        "        t.back(8)\n" +
        "\n" +
        "    # Red Cheeks\n" +
        "    def leftCheek(self, x, y):\n" +
        "        print(\"绘制左脸\")\n" +
        "        turtle.tracer(False)\n" +
        "        t = self.t\n" +
        "        self.noTrace_goto(x, y)\n" +
        "        t.seth(300)\n" +
        "        t.fillcolor('#DD4D28')\n" +
        "        t.begin_fill()\n" +
        "        a = 2.3\n" +
        "        for i in range(120):\n" +
        "            if 0 <= i < 30 or 60 <= i < 90:\n" +
        "                a -= 0.05\n" +
        "                t.lt(3)\n" +
        "                t.fd(a)\n" +
        "            else:\n" +
        "                a += 0.05\n" +
        "                t.lt(3)\n" +
        "                t.fd(a)\n" +
        "        t.end_fill()\n" +
        "        turtle.tracer(True)\n" +
        "\n" +
        "    def rightCheek(self, x, y):\n" +
        "        print(\"绘制右脸\")\n" +
        "        t = self.t\n" +
        "        turtle.tracer(False)\n" +
        "        self.noTrace_goto(x, y)\n" +
        "        t.seth(60)\n" +
        "        t.fillcolor('#DD4D28')\n" +
        "        t.begin_fill()\n" +
        "        a = 2.3\n" +
        "        for i in range(120):\n" +
        "            if 0 <= i < 30 or 60 <= i < 90:\n" +
        "                a -= 0.05\n" +
        "                t.lt(3)\n" +
        "                t.fd(a)\n" +
        "            else:\n" +
        "                a += 0.05\n" +
        "                t.lt(3)\n" +
        "                t.fd(a)\n" +
        "        t.end_fill()\n" +
        "        turtle.tracer(True)\n" +
        "\n" +
        "    def colorLeftEar(self, x, y):\n" +
        "        print(\"绘制左耳朵\")\n" +
        "        t = self.t\n" +
        "        self.noTrace_goto(x, y)\n" +
        "        t.fillcolor('#000000')\n" +
        "        t.begin_fill()\n" +
        "        t.seth(330)\n" +
        "        t.circle(100, 35)\n" +
        "        t.seth(219)\n" +
        "        t.circle(-300, 19)\n" +
        "        t.seth(110)\n" +
        "        t.circle(-30, 50)\n" +
        "        t.circle(-300, 10)\n" +
        "        t.end_fill()\n" +
        "\n" +
        "    def colorRightEar(self, x, y):\n" +
        "        print(\"绘制右耳朵\")\n" +
        "        t = self.t\n" +
        "        self.noTrace_goto(x, y)\n" +
        "        t.fillcolor('#000000')\n" +
        "        t.begin_fill()\n" +
        "        t.seth(300)\n" +
        "        t.circle(-100, 30)\n" +
        "        t.seth(35)\n" +
        "        t.circle(300, 15)\n" +
        "        t.circle(30, 50)\n" +
        "        t.seth(190)\n" +
        "        t.circle(300, 17)\n" +
        "        t.end_fill()\n" +
        "\n" +
        "    def body(self):\n" +
        "        t = self.t\n" +
        "\n" +
        "        t.fillcolor('#F6D02F')\n" +
        "        t.begin_fill()\n" +
        "        # Right face contour\n" +
        "        t.penup()\n" +
        "        t.circle(130, 40)\n" +
        "        t.pendown()\n" +
        "        t.circle(100, 105)\n" +
        "        t.left(180)\n" +
        "        t.circle(-100, 5)\n" +
        "\n" +
        "        # Right ear\n" +
        "        t.seth(20)\n" +
        "        t.circle(300, 30)\n" +
        "        t.circle(30, 50)\n" +
        "        t.seth(190)\n" +
        "        t.circle(300, 36)\n" +
        "\n" +
        "        # Upper profile\n" +
        "        t.seth(150)\n" +
        "        t.circle(150, 70)\n" +
        "\n" +
        "        # Left ear\n" +
        "        t.seth(200)\n" +
        "        t.circle(300, 40)\n" +
        "        t.circle(30, 50)\n" +
        "        t.seth(20)\n" +
        "        t.circle(300, 35)\n" +
        "        #print(t.pos())\n" +
        "\n" +
        "        # Left face contour\n" +
        "        t.seth(240)\n" +
        "        t.circle(105, 95)\n" +
        "        t.left(180)\n" +
        "        t.circle(-105, 5)\n" +
        "\n" +
        "        # Left hand\n" +
        "        t.seth(210)\n" +
        "        t.circle(500, 18)\n" +
        "        t.seth(200)\n" +
        "        t.fd(10)\n" +
        "        t.seth(280)\n" +
        "        t.fd(7)\n" +
        "        t.seth(210)\n" +
        "        t.fd(10)\n" +
        "        t.seth(300)\n" +
        "        t.circle(10, 80)\n" +
        "        t.seth(220)\n" +
        "        t.fd(10)\n" +
        "        t.seth(300)\n" +
        "        t.circle(10, 80)\n" +
        "        t.seth(240)\n" +
        "        t.fd(12)\n" +
        "        t.seth(0)\n" +
        "        t.fd(13)\n" +
        "        t.seth(240)\n" +
        "        t.circle(10, 70)\n" +
        "        t.seth(10)\n" +
        "        t.circle(10, 70)\n" +
        "        t.seth(10)\n" +
        "        t.circle(300, 18)\n" +
        "\n" +
        "        t.seth(75)\n" +
        "        t.circle(500, 8)\n" +
        "        t.left(180)\n" +
        "        t.circle(-500, 15)\n" +
        "        t.seth(250)\n" +
        "        t.circle(100, 65)\n" +
        "\n" +
        "        # Left foot\n" +
        "        t.seth(320)\n" +
        "        t.circle(100, 5)\n" +
        "        t.left(180)\n" +
        "        t.circle(-100, 5)\n" +
        "        t.seth(220)\n" +
        "        t.circle(200, 20)\n" +
        "        t.circle(20, 70)\n" +
        "\n" +
        "        t.seth(60)\n" +
        "        t.circle(-100, 20)\n" +
        "        t.left(180)\n" +
        "        t.circle(100, 20)\n" +
        "        t.seth(300)\n" +
        "        t.circle(10, 70)\n" +
        "\n" +
        "        t.seth(60)\n" +
        "        t.circle(-100, 20)\n" +
        "        t.left(180)\n" +
        "        t.circle(100, 20)\n" +
        "        t.seth(10)\n" +
        "        t.circle(100, 60)\n" +
        "\n" +
        "        # Horizontal\n" +
        "        t.seth(180)\n" +
        "        t.circle(-100, 10)\n" +
        "        t.left(180)\n" +
        "        t.circle(100, 10)\n" +
        "        t.seth(5)\n" +
        "        t.circle(100, 10)\n" +
        "        t.circle(-100, 40)\n" +
        "        t.circle(100, 35)\n" +
        "        t.left(180)\n" +
        "        t.circle(-100, 10)\n" +
        "\n" +
        "        # Right foot\n" +
        "        t.seth(290)\n" +
        "        t.circle(100, 55)\n" +
        "        t.circle(10, 50)\n" +
        "\n" +
        "        t.seth(120)\n" +
        "        t.circle(100, 20)\n" +
        "        t.left(180)\n" +
        "        t.circle(-100, 20)\n" +
        "\n" +
        "        t.seth(0)\n" +
        "        t.circle(10, 50)\n" +
        "\n" +
        "        t.seth(110)\n" +
        "        t.circle(100, 20)\n" +
        "        t.left(180)\n" +
        "        t.circle(-100, 20)\n" +
        "\n" +
        "        t.seth(30)\n" +
        "        t.circle(20, 50)\n" +
        "\n" +
        "        t.seth(100)\n" +
        "        t.circle(100, 40)\n" +
        "\n" +
        "        # Right body contour\n" +
        "        t.seth(200)\n" +
        "        t.circle(-100, 5)\n" +
        "        t.left(180)\n" +
        "        t.circle(100, 5)\n" +
        "        t.left(30)\n" +
        "        t.circle(100, 75)\n" +
        "        t.right(15)\n" +
        "        t.circle(-300, 21)\n" +
        "        t.left(180)\n" +
        "        t.circle(300, 3)\n" +
        "\n" +
        "        # Right hand\n" +
        "        t.seth(43)\n" +
        "        t.circle(200, 60)\n" +
        "\n" +
        "        t.right(10)\n" +
        "        t.fd(10)\n" +
        "\n" +
        "        t.circle(5, 160)\n" +
        "        t.seth(90)\n" +
        "        t.circle(5, 160)\n" +
        "        t.seth(90)\n" +
        "\n" +
        "        t.fd(10)\n" +
        "        t.seth(90)\n" +
        "        t.circle(5, 180)\n" +
        "        t.fd(10)\n" +
        "\n" +
        "        t.left(180)\n" +
        "        t.left(20)\n" +
        "        t.fd(10)\n" +
        "        t.circle(5, 170)\n" +
        "        t.fd(10)\n" +
        "        t.seth(240)\n" +
        "        t.circle(50, 30)\n" +
        "\n" +
        "        t.end_fill()\n" +
        "        self.noTrace_goto(130, 125)\n" +
        "        t.seth(-20)\n" +
        "        t.fd(5)\n" +
        "        t.circle(-5, 160)\n" +
        "        t.fd(5)\n" +
        "\n" +
        "        # Fingers\n" +
        "        self.noTrace_goto(166, 130)\n" +
        "        t.seth(-90)\n" +
        "        t.fd(3)\n" +
        "        t.circle(-4, 180)\n" +
        "        t.fd(3)\n" +
        "        t.seth(-90)\n" +
        "        t.fd(3)\n" +
        "        t.circle(-4, 180)\n" +
        "        t.fd(3)\n" +
        "\n" +
        "        # Tail\n" +
        "        self.noTrace_goto(168, 134)\n" +
        "        t.fillcolor('#F6D02F')\n" +
        "        t.begin_fill()\n" +
        "        t.seth(40)\n" +
        "        t.fd(200)\n" +
        "        t.seth(-80)\n" +
        "        t.fd(150)\n" +
        "        t.seth(210)\n" +
        "        t.fd(150)\n" +
        "        t.left(90)\n" +
        "        t.fd(100)\n" +
        "        t.right(95)\n" +
        "        t.fd(100)\n" +
        "        t.left(110)\n" +
        "        t.fd(70)\n" +
        "        t.right(110)\n" +
        "        t.fd(80)\n" +
        "        t.left(110)\n" +
        "        t.fd(30)\n" +
        "        t.right(110)\n" +
        "        t.fd(32)\n" +
        "\n" +
        "        t.right(106)\n" +
        "        t.circle(100, 25)\n" +
        "        t.right(15)\n" +
        "        t.circle(-300, 2)\n" +
        "        #print(t.pos())\n" +
        "        t.seth(30)\n" +
        "        t.fd(40)\n" +
        "        t.left(100)\n" +
        "        t.fd(70)\n" +
        "        t.right(100)\n" +
        "        t.fd(80)\n" +
        "        t.left(100)\n" +
        "        t.fd(46)\n" +
        "        t.seth(66)\n" +
        "        t.circle(200, 38)\n" +
        "        t.right(10)\n" +
        "        t.fd(10)\n" +
        "        t.end_fill()\n" +
        "\n" +
        "        # Tail Pattern\n" +
        "        t.fillcolor('#923E24')\n" +
        "        self.noTrace_goto(126.82, -156.84)\n" +
        "        t.begin_fill()\n" +
        "\n" +
        "        t.seth(30)\n" +
        "        t.fd(40)\n" +
        "        t.left(100)\n" +
        "        t.fd(40)\n" +
        "        t.pencolor('#923e24')\n" +
        "        t.seth(-30)\n" +
        "        t.fd(30)\n" +
        "        t.left(140)\n" +
        "        t.fd(20)\n" +
        "        t.right(150)\n" +
        "        t.fd(20)\n" +
        "        t.left(150)\n" +
        "        t.fd(20)\n" +
        "        t.right(150)\n" +
        "        t.fd(20)\n" +
        "        t.left(130)\n" +
        "        t.fd(18)\n" +
        "        t.pencolor('#000000')\n" +
        "        t.seth(-45)\n" +
        "        t.fd(67)\n" +
        "        t.right(110)\n" +
        "        t.fd(80)\n" +
        "        t.left(110)\n" +
        "        t.fd(30)\n" +
        "        t.right(110)\n" +
        "        t.fd(32)\n" +
        "        t.right(106)\n" +
        "        t.circle(100, 25)\n" +
        "        t.right(15)\n" +
        "        t.circle(-300, 2)\n" +
        "        t.end_fill()\n" +
        "\n" +
        "        # Hat, Eye, Mouth, Cheek\n" +
        "        self.cap(-134.07, 147.81)\n" +
        "        self.mouth(-5, 25)\n" +
        "        self.leftCheek(-126, 32)\n" +
        "        self.rightCheek(107, 63)\n" +
        "        self.colorLeftEar(-250, 100)\n" +
        "        self.colorRightEar(140, 270)\n" +
        "        self.leftEye(-85, 90)\n" +
        "        self.rightEye(50, 110)\n" +
        "        t.hideturtle()\n" +
        "\n" +
        "    def cap(self, x, y):\n" +
        "        self.noTrace_goto(x, y)\n" +
        "        t = self.t\n" +
        "        t.fillcolor('#CD0000')\n" +
        "        t.begin_fill()\n" +
        "        t.seth(200)\n" +
        "        t.circle(400, 7)\n" +
        "        t.left(180)\n" +
        "        t.circle(-400, 30)\n" +
        "        t.circle(30, 60)\n" +
        "        t.fd(50)\n" +
        "        t.circle(30, 45)\n" +
        "        t.fd(60)\n" +
        "        t.left(5)\n" +
        "        t.circle(30, 70)\n" +
        "        t.right(20)\n" +
        "        t.circle(200, 70)\n" +
        "        t.circle(30, 60)\n" +
        "        t.fd(70)\n" +
        "        #print(t.pos())\n" +
        "        t.right(35)\n" +
        "        t.fd(50)\n" +
        "        t.circle(8, 100)\n" +
        "        t.end_fill()\n" +
        "        self.noTrace_goto(-168.47, 185.52)\n" +
        "        t.seth(36)\n" +
        "        t.circle(-270, 54)\n" +
        "        t.left(180)\n" +
        "        t.circle(270, 27)\n" +
        "        t.circle(-80, 98)\n" +
        "\n" +
        "        t.fillcolor('#444444')\n" +
        "        t.begin_fill()\n" +
        "        t.left(180)\n" +
        "        t.circle(80, 197)\n" +
        "        t.left(58)\n" +
        "        t.circle(200, 45)\n" +
        "        t.end_fill()\n" +
        "\n" +
        "        self.noTrace_goto(-58, 270)\n" +
        "        t.pencolor('#228B22')\n" +
        "        t.dot(35)\n" +
        "\n" +
        "        self.noTrace_goto(-30, 280)\n" +
        "        t.fillcolor('#228B22')\n" +
        "        t.begin_fill()\n" +
        "        t.seth(100)\n" +
        "        t.circle(30, 180)\n" +
        "        t.seth(190)\n" +
        "        t.fd(15)\n" +
        "        t.seth(100)\n" +
        "        t.circle(-45, 180)\n" +
        "        t.right(90)\n" +
        "        t.fd(15)\n" +
        "        t.end_fill()\n" +
        "        t.pencolor('#000000')\n" +
        "\n" +
        "    def start(self):\n" +
        "        #self.mouth(-5,25)\n" +
        "        print(\"绘制身体\")\n" +
        "        self.body()\n" +
        "\n" +
        "\n" +
        "def main():\n" +
        "    #print('Painting the Pikachu... ')\n" +
        "    pikachu = Pikachu()\n" +
        "    pikachu.start()\n" +
        "    #turtle.mainloop()\n" +
        "    \n" +
        "    print(\"绘制完成\")\n" +
        "\n" +
        "\n" +
        "if __name__ == '__main__':\n" +
        "    main()\n",
}


$(document).ready(function() {
    $('.btn-picture').removeClass('hidden').hide(); // 隐藏保存图片
    // 实例化Python虚拟沙箱
    var ps = new PythonSandbox({
        codeSourceId:'code',
        codeDisplayId:'output',
        turtleCanvasId:'canvas',
        codeMirrorId:'mirror',
        logToConsole: true,
        errorHandler: function(txt) {myCustomErrorHandler(txt);}
    });

    $('#tb_clear').click(function () {
        ps.fancyEditor.setValue('');
    });

    var sizeTempArr = "300x300,300x300,300x300,500x300,600x600,360x760,760x760,500x500,600x600,800x800".split(",");
    var sizeArr = [];
    for (var i = 0; i < sizeTempArr.length; i++) {
        var arr = sizeTempArr[i].split("x");
        var obj = {};
        obj.width = parseInt(arr[0]);
        obj.height = parseInt(arr[1]);
        sizeArr.push(obj);
    }


    $("#tb_selectedType").change(function () {
        //ps.fancyEditor.setValue('');
        var selectedOption = $(this).find('option:selected');
        var selectedText = selectedOption.text();
        var selectedValue = selectedOption.val();

        console.log('选中项的文本:', selectedText);
        console.log('选中项的值:', selectedValue);


        $("#tb_width").val(sizeArr[selectedValue - 1].width);
        $("#tb_height").val(sizeArr[selectedValue - 1].height);


        $("#canvas").find("canvas").attr("width",sizeArr[selectedValue - 1].width);
        $("#canvas").find("canvas").attr("height",sizeArr[selectedValue - 1].height);



        $("#canvas").css('width',$("#tb_width").val());
        $("#canvas").css('height',$("#tb_height").val());

        ps.fancyEditor.setValue(TCODES[selectedValue]);

    });

    $("#tb_selectedType").change();


    $("#tb_width").change(function () {
        $("#canvas").find("canvas").attr("width",$(this).val());
        $("#canvas").css('width',$("#tb_width").val());
    })
    $("#tb_height").change(function () {
        $("#canvas").find("canvas").attr("height",$(this).val());
        $("#canvas").css('height',$("#tb_height").val());

    })







    // 兼容M端
    setTimeout(()=>{
        editorObj = ``;
    }, 500);
    // 隐藏停止按钮
    $('.killer').hide().removeClass('hidden');
    // 监听运行按钮
    $('#tb_run').click(function() {

        // 移除图片下载
        removeImageDownloadOption();

        // 显示停止按钮
        $('.killer').show();

        Sk.TurtleGraphics.width=$('#tb_width').val()
        Sk.TurtleGraphics.height=$('#tb_height').val()

        // 执行代码
        ps.execute();
        setTimeout(checkCanvasVisibility,1000);
    });
    $('.killer').click(function() {
        ps.killTurtle();
        removeImageDownloadOption();
        // $('.killer').hide();
    });
    $('.wrapper').click(function() {
        var wrapping = $(this).data('wrap') || $(this).data('wrap') == 'true';
        ps.toggleWrapping(!wrapping);
        $(this).data('wrap',!wrapping);
        $(this).toggleClass('btn-danger btn-default');
    });
    // 监听保存图片
    $('#tb_saveImg').click(function(e) {



        var filename = $("#tb_selectedType").find('option:selected').text() + "-" + Math.floor(Date.now() / 1000) +".png";
        var canvas = findTurtleCanvas();
        console.log(canvas)
        // var img = canvas.toDataURL('image/png');
        // $(this).attr({
        //     'download': filename,
        //     'href': img
        // });

        var link = document.createElement('a');
        link.href = canvas.toDataURL("image/png");
        link.download = filename;
        link.click();

    });
        // 监听保存图片
    $('#tb_down').click(function(e) {

        var filename = $("#tb_selectedType").find('option:selected').text() + "-" + Math.floor(Date.now() / 1000) +".py";

        var link = document.createElement('a');
        link.href = "data:text/plain;charset=utf-8," + encodeURIComponent(ps.fancyEditor.getValue());
        link.download = filename;
        link.click();

    });





    // 隐藏图片保存按钮
    function removeImageDownloadOption() {
        $('.btn-picture').hide();
    }
    // 检查Canvas是否可用
    function checkCanvasVisibility() {
        var turtleCanvas = findTurtleCanvas();
        if(turtleCanvas)
            $('.btn-picture').show();
        else
            $('.btn-picture').hide();
    }
    // 找到画布
    function findTurtleCanvas() {
        var canvas = $('#canvas').find('canvas');
        if(canvas.length && canvas.length > 1)
            return canvas.get(1);
        else
            return false;
    }
    // 是否显示动画
    $('.animate-control').click(function() {
        if($(this).data('status') == 'on')
        {
            ps.animate(false);
            $(this).data('status','off');
        }
        else
        {
            ps.animate(true);
            $(this).data('status','on');
        }
        $(this).toggleClass('btn-success btn-default');
    });
    function myCustomErrorHandler(txt) {
        $('#modal .modal-body').html(txt);
        $('#modal').modal('show');
        highlightLineOnEditor(txt);
    }
    function highlightLineOnEditor(txt) {
        var line = determineLineNumberFromError(txt);
        if(!line)
            return;
        var editor = ps.getEditor();
        line--; //-- actual line numbers start at 0
        var contents = editor.getLine(line);
        console.log(contents);

        editor.setSelection({line:line, ch:0}, {line:line, ch:contents.length});

        alertConfirm(txt,"存在错误，请检查")

    }
    function determineLineNumberFromError(txt) {
        // var regex = /^[.\s]+\sline\s(\d+)$/
        var regex = /line\s(\d+)/
        var match = txt.match(regex);
        return match ? match[1] : false;
    }
});






