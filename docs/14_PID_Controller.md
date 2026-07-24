# Project 14 - PID Control, Damping and Stability

### Prerequisites

Complete:

- 00_Introduction.md
- 00B_Oscilloscope_Familiarisation.md
- 01_PWM_Fundamentals.md
- 02_RC_Circuits.md
- 03_RLC_Circuits.md
- 04_MOSFET_Fundamentals.md
- 10_PWM_Motor_Control.md
- 12_P_Controller.md
- 13_PI_Controller.md

---

## Objective

In this project you will learn:

- What derivative action is
- Why overshoot occurs
- How derivative action improves stability
- How a PID controller works
- How to tune PID gains
- How to observe system behaviour as gains change
- Why PID controllers are widely used in engineering

The PID controller is often considered the most important controller in classical control engineering.

---

## Learning Outcomes

At the end of this project you should be able to:

✅ Explain derivative action

✅ Explain overshoot

✅ Explain damping

✅ Implement a PID controller

✅ Tune Kp, Ki and Kd

✅ Understand PID trade-offs

✅ Explain stability improvements

---

## Review of Previous Controllers

### Proportional Controller

$$
u(t) = K_P e(t)
$$

Provides immediate response. Has steady-state error.

### PI Controller

$$
u(t) = K_P e(t) + K_I \int e(t)\,dt
$$

Eliminates steady-state error. Can produce overshoot.

---

## Why Do We Need Derivative Action?

Consider a response that overshoots the target:

```text
Output

100 |          /\
    |         /  \__
    |        /
    |       /
    |      /
  0 +-----------------
           Time
```

The output exceeds the target — this is called **overshoot**.

---

## Derivative Action

Derivative action monitors how fast the error is changing rather than simply how large the error is.

The derivative term is:

$$
\frac{de(t)}{dt}
$$

If the error is changing very rapidly, derivative action applies a braking effect.

---

## Vehicle Analogy

A proportional controller behaves like:

```text
Push accelerator based on distance from target.
```

A derivative controller behaves like:

```text
Apply brakes when approaching too quickly.
```

The derivative term anticipates future behaviour.

---

## PID Controller Equation

$$
u(t) = K_P e(t) + K_I \int e(t)\,dt + K_D \frac{de(t)}{dt}
$$

Where:

- $u(t)$ = Controller Output
- $K_P$ = Proportional Gain — immediate correction
- $K_I$ = Integral Gain — eliminates steady-state error
- $K_D$ = Derivative Gain — predictive damping, reduces overshoot
- $e(t)$ = Error Signal

---

## Summary Table

| Term | Purpose |
|------|---------|
| P | React to Error |
| I | Remove Steady-State Error |
| D | Reduce Overshoot and Oscillation |

---

## MATLAB Simulation

Before building the circuit, simulate the closed-loop PID response on the motor plant to predict how derivative action reduces overshoot.

### Effect of Kd — Fixed Kp and Ki

```matlab
K   = 1;
tau = 0.5;        % your measured tau from Project 10
Kp  = 0.5;
Ki  = 1.0;

G = tf(K, [tau, 1]);

Kd_values = [0, 0.05, 0.10, 0.20, 0.50];
labels    = {'Kd=0 (PI)','Kd=0.05','Kd=0.10','Kd=0.20','Kd=0.50'};

t = 0:0.01:8;

figure; hold on;
for i = 1:5
    C = tf([Kd_values(i), Kp, Ki], [1, 0]);
    T = feedback(C * G, 1);
    [y, ~] = step(T, t);
    plot(t, y, 'LineWidth', 2, 'DisplayName', labels{i});
end
yline(1.0, 'k--', 'Reference');
grid on;
xlabel('Time (s)'); ylabel('Normalised Output');
title('PID Controller - Effect of K_D (Motor Plant)');
legend('Location', 'northeast');
```

### Prediction Table

| Case | Kp | Ki | Kd | Predicted overshoot | Predicted settling time |
|------|----|----|----|--------------------|-----------------------|
| 1 | 2.0 | 0 | 0 | | |
| 2 | 0.5 | 0.5 | 0 | | |
| 3 | 0.5 | 0.5 | 0.2 | | |

---

## Components Required

Same circuit as Projects 12 and 13:

- Arduino Uno or ESP32 DevKit V1
- Breadboard and jumper wires
- Potentiometer (setpoint)
- IRLZ44N MOSFET
- DC Motor
- Flyback diode (1N4001–1N4007)
- 220 Ω gate resistor
- External battery pack
- OWON HDS272S Oscilloscope (recommended)
- DSO Nano Oscilloscope (compatible)

---

## Experiment 1 - Implement a PID Motor Controller

### Objective

Implement a full closed-loop PID controller driving the motor via MOSFET.

The potentiometer sets the speed reference and back-EMF provides feedback.

---

### Circuit

Same as Projects 12 and 13:

```text
Battery (+)
    │
  Motor
    │──── Flyback diode (cathode toward Battery+)
    │
    ├──── 10 kΩ ──── A1  (back-EMF feedback)
                │
              10 kΩ
                │
               GND

  Drain (MOSFET IRLZ44N)
  Source
    │
   GND

PWM Output (Arduino Pin 9 or ESP32 GPIO18) ──── 220 Ω ──── Gate
Potentiometer centre pin ──── A0
```

---

### Wiring Checklist

Before uploading:

✅ Motor circuit wired correctly (same as Projects 12 and 13)

✅ Back-EMF divider connected to A1 (Arduino) or FBK_PIN (ESP32)

✅ Potentiometer wiper connected to A0 (Arduino) or REF_PIN (ESP32)

✅ Shared GND between controller and battery

---

### Arduino Code

```cpp
float Kp = 0.5;
float Ki = 1.0;
float Kd = 0.1;

const float dt           = 0.05;    // sample time (s) — matches delay(50)
const float integral_max = 500.0;   // anti-windup limit

float integral      = 0;
float previousError = 0;

void setup()
{
    // Configure pin 9 as PWM output for the MOSFET gate.
    pinMode(9, OUTPUT);
    Serial.begin(9600);
}

void loop()
{
    int reference = analogRead(A0);   // desired speed setpoint (0–1023)
    int feedback  = analogRead(A1);   // back-EMF proxy (0–1023)

    // Calculate error.
    float error = reference - feedback;

    // Integral term: accumulate error over time.
    integral = integral + error * dt;
    integral = constrain(integral, -integral_max, integral_max);

    // Derivative term: rate of change of error.
    float derivative = (error - previousError) / dt;

    // PID output.
    float output = Kp * error + Ki * integral + Kd * derivative;
    output = constrain(output, 0, 255);

    analogWrite(9, (int)output);

    Serial.print("Ref: ");  Serial.print(reference);
    Serial.print("  Fbk: "); Serial.print(feedback);
    Serial.print("  Err: "); Serial.print((int)error);
    Serial.print("  Int: "); Serial.print(integral, 2);
    Serial.print("  Der: "); Serial.print(derivative, 2);
    Serial.print("  PWM: "); Serial.println((int)output);

    // Store error for next derivative calculation.
    previousError = error;
    delay(50);
}
```

### ESP32 Equivalent Code

```cpp
float Kp = 0.5;
float Ki = 1.0;
float Kd = 0.1;

const int PWM_PIN      = 18;
const int REF_PIN      = 34;
const int FBK_PIN      = 35;
const float dt         = 0.05;
const float integralMax = 500.0;

float integral      = 0;
float previousError = 0;

void setup()
{
    // Configure LEDC channel 0: 500 Hz, 8-bit resolution.
    ledcSetup(0, 500, 8);
    ledcAttachPin(PWM_PIN, 0);
    Serial.begin(115200);
}

void loop()
{
    int reference = analogRead(REF_PIN);   // 0–4095 on ESP32 ADC
    int feedback  = analogRead(FBK_PIN);

    // Scale 12-bit error to 8-bit PWM domain.
    float error = (reference - feedback) / 16.0;

    integral = integral + error * dt;
    integral = constrain(integral, -integralMax, integralMax);

    float derivative = (error - previousError) / dt;

    float output = Kp * error + Ki * integral + Kd * derivative;
    output = constrain(output, 0, 255);

    ledcWrite(0, (int)output);

    Serial.print("Ref: ");  Serial.print(reference);
    Serial.print("  Fbk: "); Serial.print(feedback);
    Serial.print("  Err8: "); Serial.print(error, 1);
    Serial.print("  Int: "); Serial.print(integral, 2);
    Serial.print("  Der: "); Serial.print(derivative, 2);
    Serial.print("  PWM: "); Serial.println((int)output);

    previousError = error;
    delay(50);
}
```

---

### What Is Happening?

The potentiometer sets the reference $r$.

The back-EMF divider provides the measured output proxy $y$.

The controller computes:

$$
e = r - y
$$

$$
u = K_P e + K_I \int e\,dt + K_D \frac{de}{dt}
$$

With the loop closed, you should observe feedback moving toward the reference in the Serial Monitor while PWM adjusts automatically.

---

### Observe

With the loop closed:

1. Set a mid-range reference. Observe the motor settle.
2. Watch the Serial Monitor — feedback should converge toward the reference.
3. Gently load the motor shaft. Observe the derivative term spike briefly, then the integral term compensate.

---

## Experiment 2 - Effect of Derivative Gain

### Objective

Observe how changing Kd affects closed-loop behaviour (overshoot, damping and settling).

Use the same closed-loop code from Experiment 1. Change only the Kd value.

---

### Test A

```cpp
Kd = 0;   // PI Control
```

Observation:

```text
______________________
```

---

### Test B

```cpp
Kd = 0.02;
```

Observation:

```text
______________________
```

---

### Test C

```cpp
Kd = 0.10;
```

Observation:

```text
______________________
```

---

### Test D

```cpp
Kd = 0.50;
```

Observation:

```text
______________________
```

---

### Results Table

| Kd | Behaviour |
|----|-----------|
| 0 | |
| 0.02 | |
| 0.10 | |
| 0.50 | |

---

## Experiment 3 - Controller Tuning

### Objective

Investigate the effects of all three gains.

---

### Case 1 — Large Kp Only

```cpp
Kp = 2.0;
Ki = 0.0;
Kd = 0.0;
```

Expected: very responsive, possible overshoot.

---

### Case 2 — PI

```cpp
Kp = 0.5;
Ki = 0.5;
Kd = 0.0;
```

Expected: eliminates error, possible oscillation.

---

### Case 3 — PID

```cpp
Kp = 0.5;
Ki = 0.5;
Kd = 0.2;
```

Expected: improved stability, reduced overshoot.

---

## Tuning Guidelines

| Symptom | Action |
|---------|--------|
| Response too slow | Increase Kp |
| Steady-state error | Increase Ki |
| Excessive overshoot | Increase Kd |
| Oscillation | Reduce Kp or Ki |

---

## Oscilloscope Exercise

Observe the PWM output while changing the reference and gains.

```text
Probe Tip  ──────► MOSFET Gate (Arduino Pin 9 or ESP32 GPIO18)
Probe GND  ──────► Arduino GND
```

| Setting | OWON HDS272S | DSO Nano |
|---------|--------------|----------|
| Vertical scale | 2 V/div | 2 V/div |
| Horizontal scale | 500 µs/div | 500 µs/div |
| Trigger | Edge, Rising | Edge, Rising |
| Coupling | DC | DC |

---

### Observe

Adjust gains and observe changes in PWM duty cycle.

Record:

```text
__________________________________
```

---

## MATLAB Comparison

Simulate the closed-loop PID response using your actual gains from Experiments 2 and 3, and compare P, PI and PID directly.

```matlab
K   = 1;
tau = 0.5;       % your measured tau from Project 10
Kp  = 0.5;
Ki  = 1.0;
Kd  = 0.1;

G    = tf(K, [tau, 1]);
C_P  = tf(Kp, 1);
C_PI = tf([Kp, Ki], [1, 0]);
C_PID = tf([Kd, Kp, Ki], [1, 0]);

T_P   = feedback(C_P   * G, 1);
T_PI  = feedback(C_PI  * G, 1);
T_PID = feedback(C_PID * G, 1);

t = 0:0.01:8;
[y_P,   ~] = step(T_P,   t);
[y_PI,  ~] = step(T_PI,  t);
[y_PID, ~] = step(T_PID, t);

figure; hold on;
plot(t, y_P,   'b:',  'LineWidth', 2, 'DisplayName', 'P');
plot(t, y_PI,  'r--', 'LineWidth', 2, 'DisplayName', 'PI');
plot(t, y_PID, 'g',   'LineWidth', 2, 'DisplayName', 'PID');
yline(1.0, 'k--', 'Reference');
grid on;
xlabel('Time (s)'); ylabel('Normalised Output');
title('P vs PI vs PID - Motor Plant');
legend('Location', 'northeast');

controllers = {T_P, T_PI, T_PID};
names       = {'P', 'PI', 'PID'};
fprintf('%-6s %-12s %-12s %-12s\n', 'Type', 'RiseTime(s)', 'Overshoot(%)', 'SettlingTime(s)');
for i = 1:3
    info = stepinfo(controllers{i});
    fprintf('%-6s %-12.3f %-12.1f %-12.3f\n', ...
        names{i}, info.RiseTime, info.Overshoot, info.SettlingTime);
end
```

### Reflection

- Does adding Kd reduce overshoot compared to PI alone?
- Is there a Kd value beyond which the response gets worse? Why?
- How do the printed metrics compare to what you observed on the motor?

---

## Troubleshooting

### Excessive Oscillation

Reduce Kp or Ki, or increase Kd.

---

### Very Slow Response

Increase Kp carefully.

---

### Motor Doesn't Respond

Check:

✅ MOSFET wiring correct

✅ Battery connected

✅ Shared GND between controller and battery

✅ Flyback diode installed

---

### Controller Saturation

Check:

✅ Output `constrain()` limits in code

✅ Anti-windup limit

✅ Kp/Ki values not too large

---

### Derivative Spike on Setpoint Change

This is normal — the derivative term reacts to the sudden change in error.

Reduce Kd or apply derivative on measurement only (advanced topic).

---

### Troubleshooting Checklist

✅ Motor circuit wired correctly (same as Projects 12 and 13)

✅ Shared GND between controller and battery

✅ Serial Monitor shows reference, feedback, error, integral, derivative and PWM

✅ Feedback reading changes with motor speed

✅ PWM duty cycle visible on oscilloscope

✅ Anti-windup limit in code

✅ dt constant matches delay() value

✅ Motor speed changes with potentiometer

---

## Knowledge Check

### Question 1

What does derivative action measure?

---

### Question 2

Write the PID controller equation.

---

### Question 3

What does the integral term do?

---

### Question 4

What does the derivative term do?

---

### Question 5

Which gain is primarily used to reduce overshoot?

---

### Question 6

Your MATLAB comparison shows PID settling time is shorter than PI but overshoot is also lower. Explain in terms of the derivative term why this is possible — how can the controller be both faster and less oscillatory?

---

## Project Summary

In this project you learned:

✅ PID control

✅ Derivative action

✅ Damping

✅ Overshoot reduction

✅ Controller tuning

✅ Stability concepts

✅ Closed-loop performance metrics

✅ Practical PID implementation with back-EMF feedback

---

## Next Project

```text
08_Buck_Converter.md
```

Topics:

- DC-DC Conversion
- Inductors in Power Electronics
- MOSFET Switching
- Energy Transfer
- Output Ripple
- Converter Efficiency
- Practical Power Electronics
