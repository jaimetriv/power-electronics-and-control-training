# Control Theory Familiarisation

---

## Purpose

This short review connects the RC and RLC circuits to the control concepts used in Labs 08 and 11-16. It is not a replacement for the assigned sections of Ogata's _Modern Control Engineering_. Use it to refresh the language and equations before continuing with the converter and control labs.

## Reading Before This Review

Read Ogata, Chapter 2, **Mathematical Modeling of Control Systems**, for differential-equation models, transfer functions, and block diagrams. Read Chapter 5, **Transient and Steady-State Response Analysis**, for first-order and second-order responses, poles, damping, overshoot, and settling time.

Use Alexander and Sadiku, Chapters 7 and 8, to connect those ideas to first-order RC and second-order RLC circuits.

## The Control-System View

A control system can be described as:

```text
Input or reference -> Plant -> Output
                         ^        |
                         |        v
                         +-- Sensor
```

- The **plant** is the physical system being controlled.
- The **input** is the applied command or disturbance.
- The **output** is the measured quantity of interest.
- The **sensor** measures the output for comparison or analysis.
- A **controller** changes the actuator command to influence the plant.

In Labs 02 and 03, the RC or RLC circuit is the plant. The applied source is the input and the measured capacitor voltage is the output.

## Differential Equations and Transfer Functions

A differential equation describes the physical relationship between input and output. For the RC circuit:

$$
RC\frac{dV_C}{dt}+V_C=V_S
$$

With zero initial conditions, the Laplace transform gives the transfer function:

$$
H_{RC}(s)=\frac{V_C(s)}{V_S(s)}=\frac{1}{RCs+1}
$$

A transfer function is a model for the input-output relationship. It does not by itself describe non-zero initial conditions, saturation, noise, or component variation.

## Laplace Transform Essentials

The Laplace transform changes a time-domain differential equation into an algebraic equation in $s$. This makes it easier to derive transfer functions and combine blocks.

Useful transform pairs are:

| Time-domain function | Laplace transform |
|---|---|
| $1$ | $1/s$ |
| $e^{-at}$ | $1/(s+a)$ |
| $\dfrac{dx}{dt}$ | $sX(s)-x(0^-)$ |
| $\displaystyle\int_0^t x(\lambda)\,d\lambda$ | $X(s)/s$ |

For transfer functions, assume zero initial conditions unless the problem states otherwise. A step of amplitude $A$ has transform:

$$
x(t)=A \quad\Longrightarrow\quad X(s)=\frac{A}{s}
$$

### Worked Example 1: RC Transfer Function

For an RC circuit with $R=10\ \mathrm{k\Omega}$ and $C=100\ \mathrm{\mu F}$:

$$
	au=RC=(10\,000)(100\times10^{-6})=1\ \mathrm{s}
$$

The transfer function and pole are:

$$
H(s)=\frac{1}{s+1},\qquad s=-1\ \mathrm{rad/s}
$$

For a 3.3 V step:

$$
V_C(s)=\frac{3.3}{s(s+1)}
$$

Using partial fractions:

$$
V_C(t)=3.3(1-e^{-t})
$$

Therefore, the predicted values are approximately 2.09 V at 1 s, 3.14 V at 3 s, and 3.28 V at 5 s. These are the values to compare with Lab 02.

### Worked Example 2: Laplace Transform of an RC Step

Starting with:

$$
RC\frac{dV_C}{dt}+V_C=V_S
$$

Taking the Laplace transform with $V_C(0^-)=0$ gives:

$$
RCsV_C(s)+V_C(s)=V_S(s)
$$

Collecting $V_C(s)$:

$$
V_C(s)(RCs+1)=V_S(s)
$$

Dividing by the input gives the transfer function:

$$
\frac{V_C(s)}{V_S(s)}=\frac{1}{RCs+1}
$$

For a step input, substitute $V_S(s)=V_F/s$ and use partial fractions to return to the exponential charging equation. This is the same model viewed in the frequency-domain variable $s$ rather than time $t$.

### Worked Example 3: RLC Pole and Ringing Prediction

For Lab 03, take $L=100\ \mathrm{mH}$, $C=100\ \mathrm{nF}$, and $R=100\ \Omega$:

$$
\omega_n=\frac{1}{\sqrt{LC}}=10\,000\ \mathrm{rad/s}
$$

$$
f_n=\frac{\omega_n}{2\pi}\approx1591\ \mathrm{Hz}
$$

$$
\zeta=\frac{R}{2}\sqrt{\frac{C}{L}}=0.05
$$

Since $\zeta<1$, the response is underdamped. Its poles are approximately:

$$
s_{1,2}=-\zeta\omega_n\pm j\omega_n\sqrt{1-\zeta^2}
$$

$$
s_{1,2}\approx-500\pm j9987\ \mathrm{rad/s}
$$

The expected ringing frequency is approximately $1590\ \mathrm{Hz}$, with an exponentially decaying envelope. This gives a prediction to test in the RLC simulation and oscilloscope experiment.

## Poles and Time Constants

The RC pole is found from the denominator:

$$
RCs+1=0\qquad\Longrightarrow\qquad s=-\frac{1}{RC}=-\frac{1}{\tau}
$$

For a stable first-order system, the pole is negative. The time constant is:

$$
\tau=RC
$$

For a step from 0 to $V_F$:

$$
V_C(t)=V_F\left(1-e^{-t/\tau}\right)
$$

Useful checkpoints are:

| Time | Charging level | Discharging level |
|---|---:|---:|
| $1\tau$ | 63.2% | 36.8% remaining |
| $3\tau$ | 95.0% | 5.0% remaining |
| $5\tau$ | 99.3% | 0.7% remaining |

## Second-Order Systems

For the series RLC circuit measured across the capacitor:

$$
LC\frac{d^2V_C}{dt^2}+RC\frac{dV_C}{dt}+V_C=V_S
$$

The standard second-order form is:

$$
H(s)=\frac{\omega_n^2}{s^2+2\zeta\omega_n s+\omega_n^2}
$$

where:

$$
\omega_n=\frac{1}{\sqrt{LC}},\qquad
\zeta=\frac{R}{2}\sqrt{\frac{C}{L}}
$$

The damping classification is:

| Damping ratio | Response |
|---:|---|
| $\zeta<1$ | Underdamped; ringing and possible overshoot |
| $\zeta=1$ | Critically damped; fastest response without oscillation |
| $\zeta>1$ | Overdamped; no oscillation, slower response |

The damped ringing frequency for an underdamped system is:

$$
\omega_d=\omega_n\sqrt{1-\zeta^2}
$$

## Feedback and Error

In a feedback controller, the error is the difference between the reference and measured output:

$$
e(t)=r(t)-y(t)
$$

A controller uses the error to calculate an actuator command. For a proportional controller:

$$
u(t)=K_p e(t)
$$

Increasing $K_p$ usually reduces error and speeds up the response, but excessive gain can cause overshoot, oscillation, saturation, or instability.

The later controllers extend this action:

- **P:** reacts to present error.
- **PI:** adds accumulated error to reduce steady-state error.
- **PID:** adds a rate-of-change term to shape the transient response.

### Worked Example 4: Proportional Control

Suppose the reference is $r=2.0\ \mathrm{V}$, the measured output is $y=1.6\ \mathrm{V}$, and $K_p=4$:

$$
e=r-y=2.0-1.6=0.4\ \mathrm{V}
$$

$$
u=K_pe=4(0.4)=1.6
$$

The actuator must still limit $u$ to its safe range. If the actuator saturates, increasing $K_p$ cannot produce more physical output and may increase overshoot or recovery time.

## Model Assumptions

Compare a model and measurement by listing assumptions. Typical differences include:

- Component tolerance and parasitic resistance
- Oscilloscope probe loading and bandwidth
- Sensor scaling and ADC quantisation
- Sampling and computation delay
- Actuator saturation
- Switching ripple and measurement noise
- Operating-point dependence

## Exercises

Try these before looking at the answer key.

1. For $R=22\ \mathrm{k\Omega}$ and $C=47\ \mathrm{\mu F}$, calculate $\tau$, the pole, and the cutoff frequency.
2. For a 5 V step and $\tau=0.2\ \mathrm{s}$, calculate the output at $t=0.2\ \mathrm{s}$ and $t=0.6\ \mathrm{s}$.
3. For $L=47\ \mathrm{mH}$, $C=100\ \mathrm{nF}$, and $R=47\ \Omega$, calculate $\omega_n$ and $\zeta$. Classify the response.
4. For $H(s)=5/(s+5)$ and a 2 V step, write $Y(s)$ and the time-domain output $y(t)$.
5. A proportional controller has $r=3\ \mathrm{V}$, $y=2.4\ \mathrm{V}$, and $K_p=2.5$. Calculate the error and controller output.
6. From a measured step response, the final value is 4 V and the output reaches 2.53 V at 0.8 s. Estimate the first-order time constant.

## Answer Key

1. $\tau=1.034\ \mathrm{s}$, pole $\approx-0.967\ \mathrm{rad/s}$, and $f_c\approx0.154\ \mathrm{Hz}$.
2. $y(0.2)\approx3.16\ \mathrm{V}$ and $y(0.6)\approx4.75\ \mathrm{V}$.
3. $\omega_n\approx14\,586\ \mathrm{rad/s}$, $\zeta\approx0.034$, underdamped.
4. $Y(s)=10/[s(s+5)]$ and $y(t)=2(1-e^{-5t})$ V.
5. $e=0.6\ \mathrm{V}$ and $u=1.5$.
6. Since 2.53 V is 63.2% of 4 V, $\tau\approx0.8\ \mathrm{s}$.

## Checkpoint Exercise

Complete these before Lab 04 or the converter sequence:

1. From the RC circuit, calculate $\tau$ and the pole for the component values used in Lab 02.
2. From the RLC circuit, calculate $\omega_n$, $\zeta$, and whether the response is underdamped.
3. Mark the expected $1\tau$, $3\tau$, and $5\tau$ points on a measured step response.
4. Compare one measured waveform with its transfer-function prediction.
5. Record two assumptions that explain the difference.

## Link to Later Labs

- Lab 08 treats the motor as a dynamic plant.
- Lab 11 identifies a model from measured data.
- Labs 12-14 apply P, PI, and PID feedback.
- Labs 15-16 apply the models and controllers to a buck converter and design problem.

## Next Step

Continue to [MOSFET Fundamentals](04_MOSFET_Fundamentals.md), then complete the converter sequence before starting [System Identification](11_System_Identification.md).
