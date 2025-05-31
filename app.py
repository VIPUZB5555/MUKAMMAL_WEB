from flask import Flask, render_template, request

app = Flask(__name__)

@app.route('/', methods=['GET', 'POST'])
def index():
    son = None
    juftlar = []
    toqlar = []
    if request.method == 'POST':
        try:
            son = int(request.form.get('son'))
            juftlar = [i for i in range(1, son+1) if i % 2 == 0]
            toqlar = [i for i in range(1, son+1) if i % 2 != 0]
        except:
            son = None
    return render_template('index.html', son=son, juftlar=juftlar, toqlar=toqlar)

@app.route('/xo')
def xo():
    return render_template('xo.html')

@app.route('/calculator', methods=['GET', 'POST'])
def calculator():
    natija = None
    if request.method == 'POST':
        try:
            num1 = float(request.form.get('num1'))
            num2 = float(request.form.get('num2'))
            operation = request.form.get('operation')

            if operation == 'add':
                natija = num1 + num2
            elif operation == 'subtract':
                natija = num1 - num2
            elif operation == 'multiply':
                natija = num1 * num2
            elif operation == 'divide':
                if num2 != 0:
                    natija = num1 / num2
                else:
                    natija = 'Nolga bo‘lish mumkin emas!'
        except:
            natija = "Xatolik!"
    return render_template('calculator.html', natija=natija)

@app.route('/services')
def services():
    return render_template('services.html')

if __name__ == '__main__':
    app.run(debug=True)
