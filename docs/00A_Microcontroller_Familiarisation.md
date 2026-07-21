# Project 00A - Arduino Uno Familiarisation

---

## Objective

The objective of this project is to become familiar with the Arduino Uno development platform and the Arduino Integrated Development Environment (IDE).

This project introduces the basic skills required for the remainder of the course, including:

- Writing Arduino programs
- Uploading code
- Using digital inputs and outputs
- Reading analogue signals
- Generating PWM signals
- Using serial communications
- Basic debugging techniques

---

## Learning Outcomes

At the end of this project you should be able to:

✅ Identify the main Arduino Uno components

✅ Upload programs to the Arduino

✅ Use digital outputs

✅ Read digital inputs

✅ Read analogue inputs

✅ Generate PWM signals

✅ Use the Serial Monitor

✅ Build and troubleshoot simple circuits

---

## What Is Arduino?

Arduino is an educational and prototyping platform designed for learning electronics, programming, automation and control systems.

The Arduino Uno combines:

```text
Microcontroller
+
Input/Output Pins
+
USB Programming Interface
```

on a single development board.

---

## Why Learn Arduino?

Arduino provides an excellent introduction to:

- Embedded systems
- Digital control
- Sensors
- Actuators
- PWM
- Data acquisition

Many of the concepts learned with Arduino later transfer directly to:

- ESP32
- STM32
- Industrial controllers
- Converter control systems

---

## Arduino Uno Overview

Typical Arduino Uno:

```text
 ┌─────────────────────┐
 │ USB Connector       │
 │                     │
 │   ATmega328P        │
 │                     │
 │     Arduino         │
 │                     │
 │ D0 - D13            │
 │ A0 - A5             │
 └─────────────────────┘
```

---

## Main Features

### Microcontroller

```text
ATmega328P
```

---

### Clock Frequency

```text
16 MHz
```

---

### Digital I/O Pins

```text
14
```

Pins:

```text
D0 to D13
```

---

### Analogue Inputs

```text
6
```

Pins:

```text
A0 to A5
```

---

### PWM Outputs

Pins:

```text
3
5
6
9
10
11
```

support PWM generation.

---

## Important Pins

### 5V

Provides:

```text
+5 V
```

power output.

---

### GND

Circuit reference.

All circuits require a common ground connection.

---

### Digital Pins

Used for:

```text
ON/OFF Signals
```

---

### Analogue Inputs

Used for:

```text
Voltage Measurement
```

Examples:

- Potentiometers
- Sensors
- Feedback signals

---

## Development Environment

Programs are written using:

```text
Arduino IDE
```

---

## Installing Arduino IDE

Download from:

```text
https://www.arduino.cc
```

Install using default settings.

---

## First Program

A traditional first program flashes an LED.

---

## Built-In LED

The Arduino Uno contains a built-in LED connected to:

```text
Pin 13
```

---

## Blink Program

```cpp
void setup()
{
    pinMode(13, OUTPUT);
}

void loop()
{
    digitalWrite(13, HIGH);
    delay(500);

    digitalWrite(13, LOW);
    delay(500);
}
```

---

## Understanding setup()

The function:

```cpp
setup()
```

runs:

```text
Once
```

after power-up.

Typically used for:

- Pin configuration
- Initialisation

---

## Understanding loop()

The function:

```cpp
loop()
```

runs continuously.

```text
Forever
```

until power is removed.

---

## Experiment 1 - LED Flashing

### Objective

Flash the onboard LED.

---

## Procedure

1. Connect Arduino via USB.
2. Open Arduino IDE.
3. Create a new sketch.
4. Enter the Blink code.
5. Upload to the board.

---

## Observe

The LED should:

```text
ON for 0.5 seconds

OFF for 0.5 seconds
```

repeatedly.

---

## Digital Outputs

Digital outputs have two possible states:

```text
HIGH

LOW
```

or:

```text
1

0
```

---

## Experiment 2 - External LED

### Components

- LED
- 220 Ω resistor
- Breadboard

---

## Circuit

```text
Arduino D8
    │
   220Ω
    │
   LED
    │
   GND
```

---

## Code

```cpp
void setup()
{
    pinMode(8, OUTPUT);
}

void loop()
{
    digitalWrite(8, HIGH);
    delay(1000);

    digitalWrite(8, LOW);
    delay(1000);
}
```

---

## Digital Inputs

Digital inputs can detect:

```text
HIGH

LOW
```

signals.

---

## Experiment 3 - Push Button

### Circuit

```text
5V
 │
Button
 │
 D2
 │
10kΩ
 │
GND
```

---

## Code

```cpp
void setup()
{
    pinMode(2, INPUT);

    pinMode(13, OUTPUT);
}

void loop()
{
    int state = digitalRead(2);

    digitalWrite(13, state);
}
```

---

## What Is An Analogue Input?

Some signals vary continuously.

Examples:

- Potentiometers
- Temperature sensors
- Light sensors

---

## ADC Fundamentals

ADC stands for:

```text
Analogue-to-Digital Converter
```

The Arduino converts:

```text
0 V to 5 V
```

into:

```text
0 to 1023
```

digital counts.

---

## Example

```text
0 V     → 0

2.5 V   → 512

5.0 V   → 1023
```

approximately.

---

## Experiment 4 - Reading a Potentiometer

### Circuit

```text
5V
 │
Pot
 │──── A0
 │
GND
```

---

## Code

```cpp
void setup()
{
    Serial.begin(9600);
}

void loop()
{
    int value =
        analogRead(A0);

    Serial.println(value);

    delay(100);
}
```

---

## Serial Monitor

The Serial Monitor allows communication between:

```text
Arduino

and

Computer
```

---

## Opening Serial Monitor

In Arduino IDE:

```text
Tools

→

Serial Monitor
```

Select:

```text
9600 baud
```

---

## PWM Fundamentals

PWM stands for:

```text
Pulse Width Modulation
```

PWM allows a digital output to behave like an analogue output.

---

## PWM Concept

Instead of changing voltage directly:

```text
5 V
```

is switched:

```text
ON

OFF

ON

OFF
```

very rapidly.

---

## Duty Cycle

Duty cycle is:

```text
Percentage ON Time
```

---

## Example

```text
0%   OFF

50%  Half ON

100% Fully ON
```

---

## Arduino PWM Command

```cpp
analogWrite(pin,value);
```

---

## PWM Range

```text
0 to 255
```

---

## Examples

```cpp
analogWrite(9,0);
```

```text
0% Duty Cycle
```

---

```cpp
analogWrite(9,128);
```

```text
≈50% Duty Cycle
```

---

```cpp
analogWrite(9,255);
```

```text
100% Duty Cycle
```

---

## Experiment 5 - LED Brightness Control

### Circuit

```text
D9
 │
220Ω
 │
LED
 │
GND
```

---

## Code

```cpp
void setup()
{
}

void loop()
{
    for(int i=0;i<=255;i++)
    {
        analogWrite(9,i);

        delay(10);
    }

    for(int i=255;i>=0;i--)
    {
        analogWrite(9,i);

        delay(10);
    }
}
```

---

## Observe

The LED should:

```text
Gradually Brighten

Gradually Dim
```

---

## Why PWM Is Important

PWM is one of the most important concepts in this course.

It will later be used for:

- Motor control
- Buck converters
- Boost converters
- Inverters
- Voltage Source Converters

---

## Troubleshooting

### Upload Fails

Check:

✅ USB cable

✅ Board selection

✅ COM port selection

---

### LED Does Not Flash

Check:

✅ Pin number

✅ Wiring

✅ Upload completed successfully

---

### Serial Monitor Empty

Check:

✅ Baud rate

✅ USB connection

✅ Correct COM port

---

## Laboratory Exercises

Complete the following:

### Exercise 1

Modify Blink to flash:

```text
250 ms ON

250 ms OFF
```

---

### Exercise 2

Create a pattern:

```text
Short Flash

Short Flash

Long Flash
```

---

### Exercise 3

Read a potentiometer and display values using the Serial Monitor.

---

### Exercise 4

Control LED brightness using PWM.

---

### Exercise 5

Connect a button and use it to switch an LED ON and OFF.

---

## Knowledge Check

### Question 1

What is the purpose of:

```cpp
setup()
```

---

### Question 2

What is the purpose of:

```cpp
loop()
```

---

### Question 3

How many digital I/O pins does the Arduino Uno provide?

---

### Question 4

What range of values can:

```cpp
analogWrite()
```

accept?

---

### Question 5

What does PWM stand for?

---

## Project Summary

In this project you learned:

✅ Arduino Uno hardware

✅ Arduino IDE

✅ Digital Outputs

✅ Digital Inputs

✅ Analogue Inputs

✅ Serial Communication

✅ PWM Fundamentals

✅ Basic Circuit Construction

These skills form the foundation for the next project:

```text
00B_Oscilloscope_Familiarisation.md
```

where you will learn how to measure and analyse signals using an oscilloscope.
