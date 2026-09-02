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

Flash the onboard LED to confirm the IDE, USB connection, and upload process all work correctly before adding any external components.

---

## Procedure

1. Connect the Arduino to your computer using the USB cable.
2. Open the Arduino IDE.
3. Go to **Tools → Board** and select **Arduino Uno**.
4. Go to **Tools → Port** and select the COM port that appears when the Arduino is connected. If you are unsure which port, disconnect the Arduino, note the list, reconnect, and the new entry is the correct port.
5. Create a new sketch (**File → New**).
6. Delete any default text and enter the Blink code below.
7. Click **Upload** (right-arrow button). The IDE compiles the code and transfers it. The TX/RX LEDs on the board will flicker during upload.
8. Wait for the status bar to show **Done uploading**.

---

## Blink Code

```cpp
void setup()
{
    // Configure pin 13 as an output.
    // The built-in LED is physically connected to pin 13 on the Arduino Uno.
    pinMode(13, OUTPUT);
}

void loop()
{
    digitalWrite(13, HIGH);   // Set pin 13 HIGH → LED turns ON
    delay(500);               // Wait 500 milliseconds (0.5 seconds)

    digitalWrite(13, LOW);    // Set pin 13 LOW  → LED turns OFF
    delay(500);               // Wait 500 milliseconds
    // loop() repeats from the top indefinitely
}
```

---

## Observe

The small LED labelled **L** on the Arduino board should flash:

```text
ON for 0.5 seconds

OFF for 0.5 seconds
```

repeatedly.

If it does not flash, check the troubleshooting section at the end of this lab.

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

- LED (from SparkFun kit)
- 220 Ω resistor (from SparkFun kit)
- Breadboard
- 2 jumper wires

---

## About the LED

An LED has two legs of different lengths:

```text
Long leg  → Anode   (positive, +)
Short leg → Cathode (negative, −)
```

Current must flow from the anode to the cathode for the LED to light up.

---

## Why Is a Resistor Needed?

Without a resistor the LED would draw too much current and burn out immediately.

A 220 Ω resistor limits the current to a safe level (approximately 15 mA from a 5 V supply).

Resistors are not polarised; they can be connected either way around.

---

## Circuit Diagram

```text
Arduino Pin D8
    │
   220 Ω resistor
    │
   LED anode (long leg)
   LED cathode (short leg)
    │
Arduino GND pin
```

---

## Step-by-Step Wiring

1. Push the 220 Ω resistor across the breadboard so each leg is in a different row.
2. Connect a jumper wire from **Arduino pin D8** to one leg of the resistor.
3. Insert the LED so its **long leg (anode)** sits in the same row as the other leg of the resistor.
4. Connect a jumper wire from the **LED short leg (cathode)** row to any **GND** pin on the Arduino.

The current path will be:

```text
D8 → Resistor → LED anode → LED cathode → GND
```

> Tip: Always double-check that the LED legs are the correct way around before uploading code. If the LED is reversed, no damage occurs but it will not light.

---

## Code

```cpp
void setup()
{
    // Configure pin 8 as a digital output.
    // Any digital pin D2-D13 can be used; we use D8 here to avoid
    // the PWM pins and leave those free for later experiments.
    pinMode(8, OUTPUT);
}

void loop()
{
    digitalWrite(8, HIGH);   // Pull D8 to 5 V → current flows → LED ON
    delay(1000);             // Wait 1 second (1000 milliseconds)

    digitalWrite(8, LOW);    // Pull D8 to 0 V → no current → LED OFF
    delay(1000);             // Wait 1 second
    // Repeats indefinitely
}
```

---

## Wiring Checklist

Before uploading:

✅ Resistor leg in same breadboard row as Arduino D8 jumper

✅ LED long leg (anode) in same row as other resistor leg

✅ LED short leg (cathode) connected to GND

✅ GND jumper connects LED cathode row to any GND pin on Arduino

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

### Components

- Tactile push button (from SparkFun kit)
- Breadboard
- 3 jumper wires

---

## About the Push Button

The tactile push buttons in the SparkFun kit have 4 legs.

Internally, each pair of legs on the same side is already connected together. Pressing the button bridges the two sides.

```text
Left pair  ●───────────●  Right pair
               (gap)
           ← press bridges →
```

Use legs on opposite sides (one from each pair) as your two connection points.

---

## Why INPUT_PULLUP?

Without a pull-up resistor the input pin would "float" (undefined voltage) when the button is not pressed, giving random readings.

Using `INPUT_PULLUP` enables the Arduino's internal 20 kΩ pull-up resistor, which keeps the pin at 5 V (HIGH) when the button is open.

Pressing the button connects the pin directly to GND, pulling it LOW.

This means the logic is **inverted**: button pressed = LOW, button released = HIGH.

---

## Circuit Diagram

```text
Arduino Pin D2
    │
  Button leg A (one side)
  Button leg B (other side)
    │
Arduino GND pin
```

No external resistor is needed because INPUT_PULLUP handles it internally.

---

## Step-by-Step Wiring

1. Insert the push button into the breadboard so its legs straddle the centre gap (one pair of legs on each side of the gap).
2. Connect a jumper wire from **Arduino pin D2** to one button leg (either side).
3. Connect a jumper wire from the **opposite side** button leg to any **GND** pin on the Arduino.
4. The built-in LED on pin 13 is used for output; no extra wiring needed.

> Tip: If the button does not respond, rotate it 90 degrees. Some breadboard orientations connect legs that should be separated.

---

## Code

```cpp
void setup()
{
    // INPUT_PULLUP keeps D2 at HIGH (5V) when the button is open.
    // Pressing the button connects D2 to GND, reading LOW.
    pinMode(2, INPUT_PULLUP);

    // Configure the built-in LED pin as output.
    pinMode(13, OUTPUT);
}

void loop()
{
    // digitalRead(2) returns LOW (0) when button is pressed,
    // HIGH (1) when released, because of the pull-up.
    // The ! (NOT) operator inverts this so:
    //   button pressed  → state = 1 → LED ON
    //   button released → state = 0 → LED OFF
    int state = !digitalRead(2);

    // Write the result directly to the LED pin.
    digitalWrite(13, state);
}
```

---

## Wiring Checklist

Before uploading:

✅ Button straddles the breadboard centre gap

✅ D2 jumper connects to one side of the button

✅ GND jumper connects to the other side of the button

✅ No external resistor needed (pull-up is internal)

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

In practice, conversion depends on the actual ADC reference voltage (typically Vcc), so values may vary slightly.

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

### Components

- 10 kΩ potentiometer (from SparkFun kit)
- Breadboard
- 3 jumper wires

---

## About the Potentiometer

A potentiometer has three pins:

```text
Left pin   → connect to 5V
Centre pin → the wiper; voltage varies as you turn the knob
Right pin  → connect to GND
```

Turning the knob moves the wiper between GND and 5 V.

> Tip: If your readings go in the wrong direction (high when turned left instead of right), simply swap the 5 V and GND connections.

---

## Circuit Diagram

```text
Arduino 5V
    │
  Left leg of potentiometer
  Centre leg ──── A0 (Arduino analogue input)
  Right leg
    │
Arduino GND
```

---

## Step-by-Step Wiring

1. Insert the potentiometer into the breadboard so all three legs are in separate rows.
2. Connect a jumper wire from **Arduino 5V** to the **left outer leg**.
3. Connect a jumper wire from the **centre leg** (the wiper) to **Arduino A0**.
4. Connect a jumper wire from the **right outer leg** to **Arduino GND**.

The centre pin now produces a voltage between 0 V and 5 V as you turn the shaft.

---

## Code

```cpp
void setup()
{
    // Start serial communication at 9600 baud so values are
    // readable in the Serial Monitor at the same speed setting.
    Serial.begin(9600);
}

void loop()
{
    // analogRead() samples the voltage on A0 and converts it
    // to a number from 0 (= 0 V) to 1023 (= 5 V).
    int value = analogRead(A0);

    // Print the reading followed by a newline character.
    // This appears as a new line in the Serial Monitor each loop.
    Serial.println(value);

    // Wait 100 ms before the next reading to avoid flooding
    // the Serial Monitor with too many values per second.
    delay(100);
}
```

---

## Opening the Serial Monitor

1. Upload the code.
2. In the Arduino IDE go to **Tools → Serial Monitor** (or press Ctrl+Shift+M).
3. Set the baud rate in the bottom-right of the Serial Monitor to **9600 baud**.
4. Turn the potentiometer shaft and watch the numbers change between 0 and 1023.

---

## Converting ADC Value to Voltage

If you want to display the actual voltage instead of the raw count, use:

```cpp
float voltage = value * (5.0 / 1023.0);
Serial.println(voltage);
```

---

## Wiring Checklist

Before uploading:

✅ 5V jumper connects to one outer leg of potentiometer

✅ GND jumper connects to the other outer leg

✅ A0 jumper connects to the centre (wiper) leg

✅ Serial Monitor baud rate set to 9600

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

PWM is a digital switching signal whose average effect can behave like an analogue output for suitable loads (for example LEDs or motors).

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

**Important:** Use **pin D9**, not D8. PWM only works on specific Arduino Uno pins: **3, 5, 6, 9, 10, 11**. Pin D9 is used throughout this course for PWM experiments.

---

## Breadboard Diagram

The diagram below shows the top view of the breadboard. Each row of five holes (a–e) is **internally connected** — you do not need extra wires to join holes within the same row.

```
  ARDUINO UNO                 BREADBOARD (top view, rows 1–12)
  ┌────────────┐
  │            │               Columns
  │            │         a      b      c      d      e
  │         D9 ●────┐  ┌─────────────────────────────────────┐
  │            │    │  │ 1   [ ]   [ ]   [ ]   [ ]   [ ]     │
  │            │    │  │ 2   [ ]   [ ]   [ ]   [ ]   [ ]     │
  │            │    │  │ 3   [ ]   [ ]   [ ]   [ ]   [ ]     │
  │            │    │  │ 4   [ ]   [ ]   [ ]   [ ]   [ ]     │
  │            │    └─→│ 5   [●]   [ ]   [┐]   [ ]   [ ]    │ D9 wire → a5
  │            │       │ 6   [ ]   [ ]   [│]   [ ]   [ ]    │
  │            │       │ 7   [ ]   [ ]   [│]   [ ]   [ ]    │ 220 Ω resistor
  │            │       │ 8   [ ]   [ ]   [┘]   [ ]   [▲]   │ → c5 to c8, LED+ at e8
  │            │       │ 9   [ ]   [ ]   [ ]   [ ]   [│]   │
  │            │       │10   [ ]   [ ]   [ ]   [ ]   [▼]   │ LED cathode at e10
  │        GND ●────┐  │11   [ ]   [ ]   [ ]   [ ]   [ ]   │
  │            │    │  └─────────────────────────────────────┘
  └────────────┘    │                                │
                    │                                │ GND wire
                    └────────────────────────────────┘
```

### How the rows connect internally

```
Row 5:  a5 ──── b5 ──── c5 ──── d5 ──── e5   (all connected inside the breadboard)
              ↑                   ↑
           D9 wire           Resistor top leg
           plugs here        plugs here
           → they are connected via the row, no extra wire needed
```

```
Row 8:  a8 ──── b8 ──── c8 ──── d8 ──── e8   (all connected inside the breadboard)
                              ↑                  ↑
                      Resistor bottom leg    LED anode (long leg)
                      plugs here             plugs here
                      → they are connected via the row, no extra wire needed
```

---

## Step-by-Step Wiring

1. Insert the **220 Ω resistor** vertically so one leg is in **row 5, column c** and the other in **row 8, column c**.
2. Connect a **red jumper wire** from **Arduino pin D9** to **row 5, column a** on the breadboard.
3. Insert the **LED** vertically so the **long leg (anode, +)** is in **row 8, column e** and the **short leg (cathode, −)** is in **row 10, column e**.
4. Connect a **black jumper wire** from **row 10, column e** (LED cathode) to any **GND pin** on the Arduino.

> The breadboard internally connects all holes in the same row, so:
> - D9 (at a5) and the resistor top (at c5) are automatically connected.
> - The resistor bottom (at c8) and the LED anode (at e8) are automatically connected.
> No extra wire is needed between them.

---

## Code

```cpp
void setup()
{
    // No pin configuration needed here because analogWrite()
    // automatically configures the pin as an output.
}

void loop()
{
    // Fade UP: increase duty cycle from 0% to 100%
    // i goes from 0 (off) to 255 (fully on)
    for (int i = 0; i <= 255; i++)
    {
        // analogWrite sends a PWM signal on the pin.
        // Value 0 = 0% duty cycle (off)
        // Value 128 = ~50% duty cycle (half brightness)
        // Value 255 = 100% duty cycle (full brightness)
        analogWrite(9, i);

        delay(10);   // Wait 10 ms between each step for a smooth visible fade
    }

    // Fade DOWN: decrease duty cycle from 100% back to 0%
    for (int i = 255; i >= 0; i--)
    {
        analogWrite(9, i);

        delay(10);   // Same step delay for symmetrical fade
    }
    // The loop() repeats, so the LED fades up and down continuously
}
```

---

## Observe

The LED should:

```text
Gradually Brighten  (fade up over ~2.5 seconds)

Gradually Dim       (fade down over ~2.5 seconds)
```

This demonstrates that PWM is not just used for ON/OFF control; it can produce smooth analogue-like effects on suitable loads.

---

## Wiring Checklist

Before uploading:

✅ Resistor leg connected to **D9** (not D8 as in Experiment 2)

✅ LED long leg (anode) connected to other resistor leg

✅ LED short leg (cathode) connected to GND

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

<div class="result-actions">
  <button class="result-export-btn" data-lab="00A">Export Results</button>
  <button class="result-clear-btn" data-lab="00A">Clear Results</button>
</div>

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

---

## Next Project

Proceed to:

```text
00B_Oscilloscope_Familiarisation.md
```

where you will learn how to measure and analyse signals using an oscilloscope.
