# Project 00C - ESP32 DevKit V1 Familiarisation

---

## Objective

The objective of this project is to become familiar with the ESP32 DevKit V1 development platform and how to program it using the Arduino IDE.

This project introduces the key differences between the ESP32 and the Arduino Uno, including:

- 3.3 V logic levels
- Higher clock frequency and dual-core architecture
- Increased PWM resolution and flexibility
- Analogue input reading
- Serial communications
- Built-in WiFi and Bluetooth capabilities

---

## Learning Outcomes

At the end of this project you should be able to:

✅ Identify the main ESP32 DevKit V1 components

✅ Install the ESP32 board package in Arduino IDE

✅ Upload programs to the ESP32

✅ Use digital outputs

✅ Read digital inputs

✅ Read analogue inputs

✅ Generate PWM signals using the LEDC peripheral

✅ Use the Serial Monitor

✅ Understand the key differences from the Arduino Uno

---

## What Is the ESP32?

The ESP32 is a powerful microcontroller designed for connected and high-performance embedded applications.

The ESP32 DevKit V1 combines:

```text
Dual-Core Microcontroller
+
Input/Output Pins
+
WiFi and Bluetooth
+
USB Programming Interface
```

on a single development board.

---

## Why Use the ESP32?

The ESP32 offers significant advantages over the Arduino Uno for advanced projects:

- Higher clock speed
- More processing power
- Higher PWM resolution
- More analogue inputs
- Built-in WiFi and Bluetooth
- Hardware timers suitable for power electronics control

Many of the advanced projects in this course use the ESP32 because:

```text
Higher PWM Resolution
```

is required for precise control of:

- Buck Converters
- Boost Converters
- Inverters
- Grid-Following VSCs
- Grid-Forming VSCs

---

## ESP32 DevKit V1 Overview

Typical ESP32 DevKit V1:

```text
 ┌─────────────────────┐
 │ USB Connector       │
 │                     │
 │   ESP32-WROOM-32    │
 │                     │
 │   ESP32 DevKit V1   │
 │                     │
 │ GPIO0 - GPIO39      │
 │ 3.3V   GND          │
 └─────────────────────┘
```

---

## Main Features

### Microcontroller

```text
ESP32-WROOM-32
```

---

### Clock Frequency

```text
240 MHz
```

Dual-core architecture.

---

### Digital I/O Pins

```text
Up to 34
```

Pins:

```text
GPIO0 to GPIO39
```

Not all pins are available on every DevKit layout.

---

### Analogue Inputs

```text
18
```

12-bit ADC resolution:

```text
0 to 4095
```

---

### PWM

The ESP32 uses a dedicated peripheral called:

```text
LEDC
```

(LED Control)

Features:

- 16 independent PWM channels
- Up to 16-bit resolution
- Configurable frequency

---

### Logic Level

```text
3.3 V
```

This is an important difference from the Arduino Uno.

---

## Important Difference - Logic Level

The Arduino Uno operates at:

```text
5 V
```

The ESP32 operates at:

```text
3.3 V
```

Never connect 5 V signals directly to ESP32 GPIO pins.

This can permanently damage the device.

---

## Important Pins

### 3.3V

Provides:

```text
+3.3 V
```

power output.

Maximum current is limited.

---

### GND

Circuit reference.

All circuits require a common ground connection.

---

### GPIO Pins

Used for:

```text
Digital and Analogue Signals
```

---

### VIN

Accepts:

```text
5 V
```

from USB or external supply.

The onboard regulator converts this to 3.3 V internally.

---

## Development Environment

Programs are written using:

```text
Arduino IDE
```

The ESP32 requires an additional board package to be installed.

---

## Installing the ESP32 Board Package

This tutorial is validated with the Arduino-ESP32 core available through Boards Manager.
If you use a newer major core version, LEDC API calls may change; check the official migration notes if examples do not compile.

### Step 1

Open Arduino IDE.

Go to:

```text
File

→

Preferences
```

---

### Step 2

In the field:

```text
Additional Boards Manager URLs
```

add:

```text
https://raw.githubusercontent.com/espressif/arduino-esp32/gh-pages/package_esp32_index.json
```

---

### Step 3

Go to:

```text
Tools

→

Board

→

Boards Manager
```

Search for:

```text
esp32
```

Install:

```text
esp32 by Espressif Systems
```

---

### Step 4

Select the board:

```text
Tools

→

Board

→

ESP32 Arduino

→

DOIT ESP32 DevKit V1
```

---

### Step 5

Select the correct COM port:

```text
Tools

→

Port
```

---

## First Program

A traditional first program flashes an LED.

---

## Built-In LED

The ESP32 DevKit V1 contains a built-in LED connected to:

```text
GPIO2
```

---

## Blink Program

```cpp
void setup()
{
    pinMode(2, OUTPUT);
}

void loop()
{
    digitalWrite(2, HIGH);
    delay(500);

    digitalWrite(2, LOW);
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
- Peripheral initialisation

---

## Understanding loop()

The function:

```cpp
loop()
```

runs continuously:

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

1. Connect ESP32 via USB.
2. Open Arduino IDE.
3. Select the correct board and port.
4. Create a new sketch.
5. Enter the Blink code.
6. Upload to the board.

---

## Observe

The LED should:

```text
ON for 0.5 seconds

OFF for 0.5 seconds
```

repeatedly.

---

## Experiment 2 - External LED

### Important

Use a current-limiting resistor.

The ESP32 GPIO pins operate at 3.3 V.

### Components

- LED
- 220 Ω resistor
- Breadboard

---

## Circuit

```text
ESP32 GPIO18
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
    pinMode(18, OUTPUT);
}

void loop()
{
    digitalWrite(18, HIGH);
    delay(1000);

    digitalWrite(18, LOW);
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

## Input Voltage Levels

For the ESP32:

```text
HIGH = 3.3 V

LOW  = 0 V
```

Never apply 5 V to an input pin.

---

## Experiment 3 - Push Button

### Circuit

```text
GPIO4
 │
Button
 │
GND
```

Use ESP32 internal pull-up for a robust digital input configuration.

---

## Code

```cpp
void setup()
{
    pinMode(4, INPUT_PULLUP);

    pinMode(2, OUTPUT);
}

void loop()
{
    int state = !digitalRead(4);   // button pressed -> LOW -> LED ON

    digitalWrite(2, state);
}
```

---

## What Is An Analogue Input?

Some signals vary continuously.

Examples:

- Potentiometers
- Temperature sensors
- Current sensors
- Voltage dividers

---

## ADC Fundamentals

The ESP32 ADC converts:

```text
0 V to 3.3 V
```

into:

```text
0 to 4095
```

digital counts.

In practice, ADC behaviour depends on attenuation settings, reference calibration and chip-to-chip variation, so real readings can deviate from the ideal mapping.

Resolution:

```text
12-bit
```

---

## Example

```text
0 V     → 0

1.65 V  → 2048

3.3 V   → 4095
```

approximately.

---

## ADC Note

The ESP32 ADC has known non-linearity near:

```text
0 V

and

3.3 V
```

For best accuracy keep signals between:

```text
0.1 V and 3.1 V
```

---

## Experiment 4 - Reading a Potentiometer

### Circuit

```text
3.3V
 │
Pot
 │──── GPIO34
 │
GND
```

Use GPIO34 which is input-only and ADC-capable.

---

## Code

```cpp
void setup()
{
    Serial.begin(115200);
}

void loop()
{
    int value = analogRead(34);

    Serial.println(value);

    delay(100);
}
```

---

## Serial Monitor

The Serial Monitor allows communication between:

```text
ESP32

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
115200 baud
```

The ESP32 typically uses 115200 baud rather than 9600.

---

## PWM on the ESP32

The ESP32 does not use:

```cpp
analogWrite()
```

Instead it uses the LEDC peripheral.

---

## LEDC PWM Setup

Three steps are required:

```text
1. Configure channel frequency and resolution

2. Attach channel to a GPIO pin

3. Set duty cycle
```

---

## LEDC Functions

### Configure Channel

```cpp
ledcSetup(channel, frequency, resolution);
```

---

### Attach Pin

```cpp
ledcAttachPin(pin, channel);
```

---

### Set Duty Cycle

```cpp
ledcWrite(channel, duty);
```

---

## PWM Resolution

With 8-bit resolution:

```text
0 to 255
```

With 10-bit resolution:

```text
0 to 1023
```

With 16-bit resolution:

```text
0 to 65535
```

Higher resolution allows finer control.

---

## Experiment 5 - LED Brightness Control

### Circuit

```text
GPIO18
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
    ledcSetup(0, 5000, 8);

    ledcAttachPin(18, 0);
}

void loop()
{
    for(int i = 0; i <= 255; i++)
    {
        ledcWrite(0, i);

        delay(10);
    }

    for(int i = 255; i >= 0; i--)
    {
        ledcWrite(0, i);

        delay(10);
    }
}
```

---

## Understanding the Code

```cpp
ledcSetup(0, 5000, 8);
```

- Channel: 0
- Frequency: 5000 Hz
- Resolution: 8-bit

---

```cpp
ledcAttachPin(18, 0);
```

- GPIO18 assigned to channel 0

---

```cpp
ledcWrite(0, i);
```

- Channel 0 duty cycle set to value i

---

## Observe

The LED should:

```text
Gradually Brighten

Gradually Dim
```

---

## Experiment 6 - Higher PWM Resolution

Repeat Experiment 5 using 10-bit resolution.

```cpp
void setup()
{
    ledcSetup(0, 5000, 10);

    ledcAttachPin(18, 0);
}

void loop()
{
    for(int i = 0; i <= 1023; i++)
    {
        ledcWrite(0, i);

        delay(5);
    }

    for(int i = 1023; i >= 0; i--)
    {
        ledcWrite(0, i);

        delay(5);
    }
}
```

---

## Observe

The transition should appear smoother because:

```text
1024 steps
```

are available instead of:

```text
256 steps
```

---

## Comparison Table

| Feature | Arduino Uno | ESP32 DevKit V1 |
|---------|------------|----------------|
| Voltage | 5 V | 3.3 V |
| Clock | 16 MHz | 240 MHz |
| ADC Resolution | 10-bit | 12-bit |
| PWM Resolution | 8-bit | Up to 16-bit |
| PWM Channels | 6 | 16 |
| WiFi | No | Yes |
| Bluetooth | No | Yes |
| PWM Function | analogWrite() | ledcWrite() |

---

## Why PWM Resolution Matters

In power electronics applications:

```text
Higher Resolution
```

means:

```text
Finer Duty Cycle Control
```

For a Buck Converter operating at:

```text
12 V Input
```

with 8-bit resolution the minimum voltage step is approximately:

$$
\frac{12}{255} \approx 47 \text{ mV}
$$

With 16-bit resolution:

$$
\frac{12}{65535} \approx 0.18 \text{ mV}
$$

This is important for precise voltage regulation.

---

## Troubleshooting

### Upload Fails

Check:

✅ USB cable

✅ Board selection set to DOIT ESP32 DevKit V1

✅ COM port selection

✅ Hold BOOT button during upload if required

---

### LED Does Not Flash

Check:

✅ GPIO number

✅ Wiring

✅ 3.3 V logic level

✅ Upload completed successfully

---

### Serial Monitor Empty

Check:

✅ Baud rate set to 115200

✅ USB connection

✅ Correct COM port

---

### LEDC PWM Not Working

Check:

✅ ledcSetup() called in setup()

✅ ledcAttachPin() called before ledcWrite()

✅ Channel number consistent across all three functions

---

## Laboratory Exercises

Complete the following:

### Exercise 1

Modify Blink to flash at:

```text
100 ms ON

100 ms OFF
```

---

### Exercise 2

Read a potentiometer on GPIO34 and print the value to the Serial Monitor.

---

### Exercise 3

Map the potentiometer reading to a PWM duty cycle and control LED brightness.

---

### Exercise 4

Change the PWM frequency to 20 kHz and observe any difference in LED behaviour.

---

### Exercise 5

Use 12-bit PWM resolution and sweep the duty cycle from 0 to 4095.

---

## Knowledge Check

### Question 1

What logic voltage level does the ESP32 use?

---

### Question 2

What function replaces analogWrite() on the ESP32?

---

### Question 3

What is the ADC resolution of the ESP32?

---

### Question 4

How many PWM channels does the ESP32 LEDC peripheral provide?

---

### Question 5

Why is higher PWM resolution important in power electronics?

---

## Project Summary

In this project you learned:

✅ ESP32 DevKit V1 hardware

✅ Arduino IDE ESP32 board package installation

✅ Digital Outputs

✅ Digital Inputs

✅ Analogue Inputs

✅ LEDC PWM generation

✅ PWM resolution and frequency configuration

✅ Key differences from the Arduino Uno

These skills are required for the advanced projects in this course:

```text
16_Grid_Following_VSC.md

17_Grid_Forming_VSC.md
```

where the ESP32 is used as the primary controller.
