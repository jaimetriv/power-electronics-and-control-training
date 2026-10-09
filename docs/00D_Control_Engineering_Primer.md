# Control Engineering Review: From Circuit Laws to Controller Design

---

## Purpose and Task

This standalone review connects **Alexander and Sadiku, _Fundamentals of Electric Circuits_**, with **Ogata, _Modern Control Engineering_**. It develops physical intuition, mathematical models, feedback analysis and practical design. Earlier labs, additional textbooks and hardware are not prerequisites. The explanations and exercises here are original summaries, not reproductions of textbook passages or problems.

The task is to explain a plant from its components, predict its response, design feedback to meet stated requirements, and test where the prediction fails. Circuit examples supply the physical foundation; control examples show what changes when sensors, actuators and software join the circuit.

## Study Routes and Prerequisites

| Route | Sections | Outcome |
|---|---|---|
| Core review | Steps 1-9, including the circuit and motor examples | Derive a model and explain transient response, feedback and controller action |
| Design extension | Step 10 and the stability, frequency-domain and state-space sections | Check stability, robustness and internal dynamics |
| Practical implementation | Steps 11-12 and the complete design exercise | Handle operating points, saturation and sampling; validate a design |

Use basic algebra and differentiation; the transform and complex-frequency essentials are reviewed below. Keep units beside physical quantities and use radians per second for angular frequency. All numerical control exercises are simulations unless explicitly identified otherwise. They do not authorise enabling the course's deferred converter controllers or connecting any circuit to mains.

MATLAB examples using `tf`, `feedback`, `step`, `margin`, `rlocus`, `ss` or `c2d` require **Control System Toolbox**. The physical-model `ode45` example needs MATLAB only. Read the predicted result before running a command; code is a check, not a substitute for explaining the result.

**Reading convention:** the book ISBNs recorded for this course are `9780072977189` (Alexander and Sadiku) and `9789332550162` (Ogata). Topic titles below are index/search locators, not verified edition-specific chapter numbers. Use your copy's contents and index; exact section/page numbering remains unverified.

## How To Predict This Circuit

### 1. Component Behaviour

Begin with $v_R=Ri$, $i_C=C\,dv_C/dt$ and $v_L=L\,di_L/dt$, with consistent reference directions. A controller computes a command from error; unlike L or C, its mathematical state need not represent stored physical energy.

### 2. Physical Meaning

Identify the energy source, stores and losses before choosing a transfer function. In an RC plant, C stores energy while R dissipates it. Feedback changes source delivery through an actuator; it does not remove the plant's physical limits.

### 3. Topology

Mark plant input, output and return path, then distinguish the electrical circuit from the feedback diagram. Sensor gain and the error sign determine whether a command corrects or reinforces a deviation. Express reference and measurement in matching units.

### 4. Prediction

Predict initial continuity, transient shape and final balance before calculating poles. The uncharged example RC plant has a rising capacitor voltage with a 1 s time constant. Feedback can change the response, but only within the actuator's achievable range.

### 5. Reality Check

Transfer functions assume a stated model and operating condition. Component tolerance, sensor error, sampling delay and saturation can invalidate an ideal prediction. The primer's numerical converter examples are modelling exercises, not replacement settings for the hardware labs.

### 6. Measurement

For each worked example, write an expected initial value, final value and time scale, then compare the complete simulated response. Later, compare safe measured data with those predictions; a single matching final value does not validate transient behaviour.

---

## Worked-Example Parameters

| Example | Parameter | Value |
|---|---|---:|
| RC plant | $R$, $C$ | $10\ \mathrm{k\Omega}$, $100\ \mathrm{\mu F}$ |
| RC input | Step $V_S$, initial $V_C(0)$ | $3.3\ \mathrm{V}$, $0\ \mathrm{V}$ |
| RLC plant | $R$, $L$, $C$ | $100\ \Omega$, $100\ \mathrm{mH}$, $100\ \mathrm{nF}$ |
| P feedback | $K_p$, reference, sensor gain | $2$, $3.3\ \mathrm{V}$, $1$ |
| Digital PI | $K_p$, $K_i$, $T_s$ | $2$, $5\ \mathrm{s^{-1}}$, $0.01\ \mathrm{s}$ |
| Digital PI | Initial error, integral state | $0.4\ \mathrm{V}$, $0\ \mathrm{V}$ |
| Boost linearisation | $V_{IN}$, operating duty $D_0$, duty change $\hat d$ | $3.3\ \mathrm{V}$, $0.5$, $0.01$ |

## Step 1: Identify the System

### Vocabulary and Reference Directions

| Quantity | Meaning | Example |
|---|---|---|
| Input $u$ | Quantity applied to the plant | Terminal voltage, V |
| Output $y$ | Quantity to predict or regulate | Capacitor voltage, V; shaft speed, rad/s |
| State $x$ | Internal information needed to predict subsequent motion | Capacitor voltage or inductor current |
| Reference $r$ | Desired measured quantity | Requested voltage or calibrated speed |
| Disturbance $d$ | External influence not commanded by the controller | Load torque or supply variation |
| Measurement noise $n$ | Error added by sensing | ADC noise, expressed in sensor units |
| Equilibrium | Constant states with balanced flows | Constant motor speed with torque balancing load |

Use the passive sign convention for R, L and C: positive current enters the terminal labelled positive voltage. Then $p=vi>0$ means absorbed power. A negative derivative is not necessarily a negative state: positive inductor current can be falling. Similarly, negative feedback describes the correction sign, not a requirement that all signals be negative.

A model is **linear** when superposition applies, and **time invariant** when its parameters do not depend on time. Saturation, diode switching and friction thresholds are nonlinear. An operating point is the equilibrium about which a local linear model is valid.

A **plant** is the physical system being studied or controlled. Its **input** is the applied signal; its **output** is the quantity of interest. A sensor measures the output, an actuator applies the command, and a disturbance is an unwanted change such as a load increase.

This description is the starting point for any model: decide what quantity enters the plant and what quantity you will observe. In a control loop, the measured output is compared with a reference; in an open-loop experiment, you can simply observe how the output responds to a chosen input.

**Book connection:** Ogata: introduction to feedback, mathematical modelling, block diagrams and control-system components.

```text
Reference -> Controller -> Actuator -> Plant -> Output
                 ^                           |
                 +--------- Sensor -----------+
```

**Worked example:** for the RC plant, the input is source voltage $V_S$, the output is capacitor voltage $V_C$, the plant is the R-C circuit, and a voltage probe is the sensor. A changed load would be a disturbance. At this stage we are observing the system; no controller is required.

## Step 2: Write a Physical Model

Use circuit laws and component relationships. For the series RC circuit:

```text
Source u (+) ---- R ----+---- output y = capacitor voltage
                       |
                       C
                       |
Source return ---------+---- reference GND
```

Current is positive from the source through R into C's upper terminal. The output measurement is across C; placing it across R would give a different transfer function.

The differential equation expresses the physical laws in terms of changing signals. It is useful before choosing a control strategy because it exposes the system's energy storage and time-dependent behavior. Keep initial conditions and units explicit.

$$
V_S=V_R+V_C,\qquad V_R=iR,\qquad i=C\frac{dV_C}{dt}
$$

Substitution gives:

$$
RC\frac{dV_C}{dt}+V_C=V_S
$$

**Worked example:** $RC=(10\,000)(100\times10^{-6})=1\ \mathrm{s}$. The numerical equation is therefore $(1\ \mathrm{s})dV_C/dt+V_C=V_S$. The seconds coefficient ensures the derivative term has voltage units.

**Book connection:** Alexander and Sadiku: capacitors, inductors and first-order circuits; Ogata: mathematical modelling of physical systems.

### RL Example: Current Is the State

Consider an ideal voltage source driving a series resistor and inductor, with output current $i$. Use $R=10\ \Omega$, $L=0.1\ \mathrm{H}$ and a 1 V source step from zero current.

```text
u (voltage) -> R -> L -> source return
                 current i through both components
```

**1. Component behaviour:** $v_R=Ri$ and $v_L=L\,di/dt$ with current into each positive voltage terminal.

**2. Physical meaning:** L stores $Li^2/2$; R dissipates $Ri^2$. The source supplies both stored energy and heat.

**3. Topology:** the same current passes through R and L, so KVL gives $L\,di/dt+Ri=u$.

**4. Prediction:** initially $i=0$ and $di/dt=u/L=10\ \mathrm{A/s}$. As current grows, the resistor takes more voltage, leaving less across L. At steady state $i=u/R=0.1\ \mathrm{A}$, with $\tau=L/R=0.01\ \mathrm{s}$:

$$
i(t)=0.1(1-e^{-t/(0.01\,\mathrm{s})})\ \mathrm{A},\qquad
\frac{I(s)}{U(s)}=\frac{1}{Ls+R}.
$$

**5. Reality check:** winding resistance adds to R, saturation changes L, and opening a real current path can produce a large voltage. This is a modelling example, not an instruction to interrupt an energised inductor.

**6. Measurement:** expect 63.2 mA after 10 ms. Compare the simulated current and resistor voltage; an instantaneous current jump contradicts the finite-voltage inductor model.

### Motor Example: Electrical and Mechanical States

For a simplified armature-controlled brushed motor, use current $i$ and shaft speed $\omega$ as states:

$$
L\dot i=u-Ri-K_e\omega,\qquad
J\dot\omega=K_t i-b\omega-T_{load}.
$$

These are simulation parameters, not specifications for a motor to purchase:

| Parameter | Value | Meaning |
|---|---:|---|
| $R$ | $2\ \Omega$ | Winding resistance |
| $L$ | $0.01\ \mathrm{H}$ | Winding inductance |
| $J$ | $0.001\ \mathrm{kg\,m^2}$ | Rotor/load inertia |
| $b$ | $0.001\ \mathrm{N\,m\,s/rad}$ | Viscous friction coefficient |
| $K_t$ | $0.05\ \mathrm{N\,m/A}$ | Torque constant |
| $K_e$ | $0.05\ \mathrm{V\,s/rad}$ | Back-EMF constant |

**1. Component behaviour:** current creates torque $K_t i$, while motion generates opposing voltage $K_e\omega$.

**2. Physical meaning:** L stores magnetic energy and J stores kinetic energy $J\omega^2/2$. Resistance and friction dissipate energy; load torque removes mechanical power.

**3. Topology:** applied voltage first changes winding current, which changes torque and speed; back-EMF closes an internal physical coupling. This is not yet an external speed-feedback controller.

**4. Prediction:** a 1 V step from rest initially gives $\dot i=100\ \mathrm{A/s}$ and $\dot\omega=0$. With zero external load torque, equilibrium gives:

$$
\omega_{ss}=\frac{K_t u}{Rb+K_tK_e}=11.111\ \mathrm{rad/s},\qquad
i_{ss}=\frac{b\omega_{ss}}{K_t}=0.2222\ \mathrm{A}.
$$

Converting speed gives $RPM=60\omega/(2\pi)\approx106.1$. Eliminating current at zero initial conditions gives:

$$
G_m(s)=\frac{\Omega(s)}{U(s)}
=\frac{K_t}{(Ls+R)(Js+b)+K_tK_e}
=\frac{0.05}{0.00001s^2+0.00201s+0.0045}.
$$

Its poles are approximately $-2.264$ and $-198.736\ \mathrm{s^{-1}}$. The well-separated fast electrical mode explains why a first-order speed approximation can work after the initial transient.

**5. Reality check:** this omits Coulomb friction, brush effects, gearbox dynamics, PWM ripple and current limits. The dominant-pole approximation is not valid for every motor or every input.

**6. Measurement:** plot current and speed for the same step. Current leads mechanical response; a later load-torque increase first reduces acceleration and speed, then reduced back-EMF increases current. Fit on one response and validate on another input/load case.

**MATLAB check, no Control System Toolbox required:**

```matlab
windingResistance = 2;
windingInductance = 0.01;
rotorInertia = 0.001;
frictionCoefficient = 0.001;
torqueConstant = 0.05;
emfConstant = 0.05;
inputVoltage = 1;
motorDerivative = @(time, state) [ ...
    (inputVoltage - windingResistance*state(1) ...
        - emfConstant*state(2))/windingInductance; ...
    (torqueConstant*state(1) ...
        - frictionCoefficient*state(2))/rotorInertia];
[time, states] = ode45(motorDerivative, [0 4], [0; 0]);
tiledlayout(2, 1);
nexttile;
plot(time, states(:, 1)); grid on;
ylabel('Current (A)');
nexttile;
plot(time, states(:, 2)); grid on;
ylabel('Speed (rad/s)'); xlabel('Time (s)');
```

## Step 3: Use Laplace Transforms and Transfer Functions

### Transform Essentials and Initial Conditions

For causal signals, $F(s)=\int_0^\infty f(t)e^{-st}\,dt$. Here $s=\sigma+j\omega$: the real part describes exponential growth/decay and the imaginary part oscillation. A sinusoidal steady-state test evaluates the transfer function at $s=j\omega$ after stable transients have decayed.

| Time-domain signal | Laplace transform | Interpretation |
|---|---|---|
| Unit step | $1/s$ | Constant input applied at zero |
| Unit ramp | $1/s^2$ | Input increasing at unit slope |
| $e^{-at}$ | $1/(s+a)$ | Decaying mode when $a>0$ |
| $\dot f$ | $sF(s)-f(0^-)$ | Initial state contributes separately |
| $\ddot f$ | $s^2F(s)-sf(0^-)-\dot f(0^-)$ | Two initial-condition terms |

For an RC circuit with initial voltage $V_0$ and constant source $V_F$:

$$
V_C(s)=\frac{V_F/s+RC V_0}{RCs+1},\qquad
v_C(t)=V_F+(V_0-V_F)e^{-t/(RC)}.
$$

The transfer function describes the zero-state input response; the initial-voltage term describes the zero-input response. Setting initial state to zero is a definition used to obtain $G(s)$, not a claim that real capacitors always start discharged.

For partial fractions, $1/[s(s+1)]=1/s-1/(s+1)$, which immediately gives $1-e^{-t}$. The **final value theorem**, $f(\infty)=\lim_{s\to0}sF(s)$, requires all poles of $sF(s)$ to have strictly negative real parts. Check that condition before using the theorem; evaluating a formula at zero cannot prove stability.

The Laplace transform turns differential equations into algebraic equations in $s$. A transfer function is the output-to-input ratio in the Laplace domain, assuming zero initial conditions. For example, $\mathcal{L}\{dx/dt\}=sX(s)-x(0^-)$ and a step of amplitude $A$ has transform $A/s$.

The transform makes it easier to combine system blocks and analyze responses. A transfer function describes the plant's input-output behavior for zero initial conditions; it does not include nonlinear saturation, noise, or component variation.

**Worked example:** with $V_C(0)=0$, transform the RC equation:

$$
RCsV_C(s)+V_C(s)=V_S(s)
$$

Divide by the input to obtain:

$$
G(s)=\frac{V_C(s)}{V_S(s)}=\frac{1}{RCs+1}=\frac{1}{s+1}
$$

The low-frequency or DC gain is 1: after transients settle, the capacitor voltage approaches the source voltage.

**Book connection:** Ogata: Laplace transforms, transfer functions and mathematical modelling; Alexander and Sadiku: Laplace-transform circuit analysis.

## Step 4: Find Poles and Predict a Step Response

Poles are roots of the transfer-function denominator. For a first-order system the pole sets the exponential response rate; a negative real pole produces a decaying transient.

The response to a step helps interpret a model in the time domain. The time constant $\tau$ is the time to reach 63.2% of the total change; it is the reciprocal of the magnitude of the first-order pole.

**Worked example:** the RC pole is $s=-1/(RC)=-1\ \mathrm{s^{-1}}$, so $\tau=RC=1\ \mathrm{s}$. For a 3.3 V step:

$$
V_C(s)=\frac{3.3}{s(s+1)}
\quad\Longrightarrow\quad
V_C(t)=3.3\left(1-e^{-t/(1\,\mathrm{s})}\right)\ \mathrm{V}
$$

| Time | Predicted $V_C$ |
|---:|---:|
| $1\tau=1\ \mathrm{s}$ | $2.09\ \mathrm{V}$ (63.2% of final value) |
| $3\tau=3\ \mathrm{s}$ | $3.14\ \mathrm{V}$ (95.0%) |
| $5\tau=5\ \mathrm{s}$ | $3.28\ \mathrm{V}$ (99.3%) |

**Book connection:** Ogata: transient and steady-state response; Alexander and Sadiku: first-order circuits.

## Step 5: Recognise a Second-Order System

A pole is a root of the denominator and a zero a root of the numerator after stating any cancellations. Poles govern natural modes; zeros change how those modes combine in the input-output response. A right-half-plane zero can cause an initial response opposite to the final direction and constrains achievable bandwidth. Do not cancel it with an unstable controller pole.

Two energy-storage elements often produce a second-order model. Its standard form is:

$$
G(s)=\frac{\omega_n^2}{s^2+2\zeta\omega_n s+\omega_n^2}
$$

$\omega_n$ is natural frequency and $\zeta$ is damping ratio. Natural frequency sets the characteristic speed of the response; damping describes how quickly oscillations decay. If $\zeta<1$, the response is underdamped and rings; $\zeta=1$ is critically damped; $\zeta>1$ is overdamped.

**Worked RLC example:** for a series RLC circuit measured across its capacitor, use $R=100\ \Omega$, $L=0.1\ \mathrm{H}$, and $C=10^{-7}\ \mathrm{F}$:

```text
Source u (+) ---- R ---- L ----+---- output y = capacitor voltage
                             |
                             C
                             |
Source return ---------------+---- reference GND
```

The common series current charges C; the source sees the resistor, inductor and capacitor voltages added together. Consequently $LC\ddot y+RC\dot y+y=u$, and $G(s)=1/(LCs^2+RCs+1)$. This is why the natural frequency and damping below depend on this topology, not merely on having three components named R, L and C.

$$
\omega_n=\frac{1}{\sqrt{LC}}=10\,000\ \mathrm{rad/s},\qquad
\zeta=\frac{R}{2}\sqrt{\frac{C}{L}}=0.05
$$

Since $\zeta<1$, expect ringing. The damped frequency is $\omega_d=\omega_n\sqrt{1-\zeta^2}\approx9987\ \mathrm{rad/s}$, or about $1590\ \mathrm{Hz}$.

**Book connection:** Alexander and Sadiku: second-order circuits; Ogata: second-order transient response.

## Step 6: Estimate a Model from Measurements

**System identification** uses measured input-output data to estimate a model. First choose a plausible model structure, then apply a known input and record the response. For $G(s)=K/(\tau s+1)$, estimate $K$ from the steady-state output change divided by the input change. Estimate $\tau$ as the time to reach 63.2% of the total output change after a step. Finally compare the model with the measured curve; fitting one point alone is not model validation.

**Worked example:** for the RC plant, a 3.3 V input step produces a final 3.3 V output, so $K=3.3/3.3=1$. The output reaches about 2.09 V at 1 s, which is 63.2% of its total change; estimate $\tau\approx1\ \mathrm{s}$. Compare the complete predicted curve with measurements to check whether the model is adequate.

**Book connection:** Ogata: mathematical modelling and transient response. Parameter fitting below is a practical application of those models, not a claim that every edition contains a dedicated identification chapter.

## Step 7: Close the Feedback Loop

Feedback measures the output and uses its difference from the desired reference to correct the plant. The error is $e(t)=r(t)-y(t)$. Sensor gain matters: the unity-feedback formula is valid only when the feedback path is modeled as $H(s)=1$. For controller $C(s)$, plant $G(s)$, and sensor $H(s)$, the reference-to-output transfer function is:

$$
T(s)=\frac{C(s)G(s)}{1+C(s)G(s)H(s)}
$$

For unity feedback, $H(s)=1$. A proportional controller uses $C(s)=K_p$.

**Worked P-control example:** let $G(s)=1/(s+1)$, $K_p=2$, and reference $r=3.3\ \mathrm{V}$. Then:

$$
T(s)=\frac{2}{s+3}
$$

The DC gain is $T(0)=2/3$. Thus $y(\infty)=2.2\ \mathrm{V}$ and steady-state error is $e_{ss}=3.3-2.2=1.1\ \mathrm{V}$. The closed-loop pole is $-3\ \mathrm{s^{-1}}$.

This example assumes an ideal voltage actuator. At startup $u(0^+)=K_p r=6.6\ \mathrm{V}$, so it cannot be implemented unchanged by a 0-3.3 V GPIO/PWM source. Limiting the actuator changes the initial transient. For a bounded 3.3 V source, use a smaller reference or explicitly simulate the limit rather than claiming the ideal transfer function describes the entire response.

**Book connection:** Ogata: feedback structure, proportional action and steady-state error.

## Step 8: Understand P, PI, and PID

### Sensor Scaling and Block Diagrams

For blocks in series, multiply transfer functions; for parallel paths entering the same summing node, add them with their signs. With controller C, plant G and sensor H, loop transfer is $L=CGH$. The return path determines the characteristic equation $1+L=0$ for negative feedback.

If a divider measures $y/2$, the error must compare that measurement with $r_{physical}/2$. Comparing a 2 V physical target directly with a half-scale sensor would request 4 V output. Sensor calibration therefore affects equilibrium as well as gain. Unity-feedback formulas apply only after consistent scaling, not because a block diagram happens to omit the sensor box.

### Tracking, Disturbances and Noise Are Different Tests

For the following equations only, use unity feedback, noise added to the output measurement, and disturbance added at the **plant input**:

$$
u=C(r-y-n),\qquad y=G(u+d).
$$

Define sensitivity $S=1/(1+CG)$ and complementary sensitivity $T=CG/(1+CG)$. Then:

$$
y=Tr+GSd-Tn,\qquad S+T=1.
$$

An output-added disturbance instead reaches y through S, not GS. Always state disturbance location. High low-frequency loop gain reduces tracking error and disturbances, but measurement noise can be transmitted through T. Controller effort due to measurement noise is $-CSn$ and may be large even when the visible output looks smooth.

**Worked comparison:** for $G=1/(s+1)$ and $C=2$, $S=(s+1)/(s+3)$ and $GS=1/(s+3)$. A 1 V reference settles at 2/3 V; a separate constant +0.3 V plant-input disturbance adds +0.1 V to output. P feedback reduces that disturbance but does not eliminate it.

### System Type and Error Constants

For a stable unity-feedback loop, let $K_{pos}=\lim_{s\to0}L(s)$, $K_{vel}=\lim_{s\to0}sL(s)$ and $K_{acc}=\lim_{s\to0}s^2L(s)$. These are error constants, not the controller gains $K_p$, $K_i$ or $K_d$.

| Reference | Final error, when the limit is valid |
|---|---|
| Unit step | $1/(1+K_{pos})$ |
| Unit ramp | $1/K_{vel}$ |
| Unit parabolic input $t^2/2$ | $1/K_{acc}$ |

For $L=2/(s+1)$, step error is 1/3 and ramp error grows without bound. For $L=(3s+4)/[s(s+1)]$, the stable loop is type 1: step error is zero but unit-ramp error is $1/4$. Integral action does not imply perfect tracking of every signal.

P reacts to present error, I accumulates persistent error, and D reacts to how quickly the error changes. Combining them lets the designer trade response speed, accuracy, overshoot, and noise sensitivity.

| Controller | Equation | Main effect | Main caution |
|---|---|---|---|
| P | $u=K_p e$ | Corrects present error | Can leave step error; high gain can cause overshoot or instability |
| PI | $u=K_p e+K_i\int e\,dt$ | Accumulated error can remove step error | Integral windup during saturation |
| PID | $u=K_p e+K_i\int e\,dt+K_d\,de/dt$ | Derivative action can shape transient response | Amplifies noise and can kick on reference steps |

System type counts uncancelled poles at the origin in the **complete loop transfer function**, not in the controller alone. For this nonintegrating RC plant, P gives type 0 and PI gives type 1. A position plant can already contain an integrator, so P control need not imply type 0. A stable type 1 unity-feedback loop tracks a step with zero error only when the reference is reachable and the ideal model's assumptions hold. Practical PID controllers filter derivative action and may differentiate measurement instead of reference.

**Book connection:** Ogata: PID control, system type, steady-state error and feedback design. Implementation details such as anti-windup are treated here as practical extensions.

## Step 9: Describe Transient Performance and Frequency Response

Use explicit conventions: rise time here is 10%-90% of the final output change, and settling time uses a 2% band around that change. If a response has a nonzero baseline, subtract it first. Overshoot is relative to the final change, not necessarily to the requested reference; report tracking error separately when they differ.

For the first-order $1/(\tau s+1)$, $t_r=\tau\ln(9)\approx2.197\tau$ and $t_s=-\tau\ln(0.02)\approx3.912\tau$. A faster rise is not necessarily better if it demands an impossible command or excites unmodelled dynamics.

Time-domain measures summarize how a system responds to a step: rise time describes how quickly the response approaches its target, overshoot is the amount it exceeds the final value, and settling time is when it stays within a chosen band, often 2%. Frequency response instead describes how the system treats sinusoidal inputs at different frequencies; magnitude is gain and phase is the output's phase shift relative to the input.

**Book connection:** Ogata: transient response and frequency-response analysis; Alexander and Sadiku: sinusoidal steady state and frequency response.

For a standard underdamped second-order response:

$$
M_p=100e^{-\zeta\pi/\sqrt{1-\zeta^2}}\ \%,\qquad
t_s\approx\frac{4}{\zeta\omega_n}\quad\text{(2% estimate)}
$$

**Worked transient example:** with $\zeta=0.5$ and $\omega_n=10\ \mathrm{rad/s}$, estimated overshoot is 16.3% and settling time is 0.8 s. Zeros, delay, saturation, and filtering can change measured performance.

Frequency response describes how sinusoidal inputs at different frequencies are amplified or attenuated and phase-shifted. For the RC plant:

$$
|G(j\omega)|=\frac{1}{\sqrt{1+(\omega RC)^2}},\qquad
\angle G(j\omega)=-\tan^{-1}(\omega RC)
$$

**Worked Bode example:** with $RC=1\ \mathrm{s}$, $f_c=1/(2\pi RC)=0.159\ \mathrm{Hz}$. At $\omega_c=1\ \mathrm{rad/s}$, magnitude is 0.707 ($-3\ \mathrm{dB}$) and phase is $-45^\circ$. A Bode plot shows these quantities versus frequency.

## Step 10: Check Stability and Use Root Locus

For unity negative feedback, closed-loop poles solve $1+C(s)G(s)=0$. Negative-real-part poles produce decaying modes; a pole with a positive real part produces an unstable growing mode. The **root locus** plots how closed-loop poles move as controller gain changes, helping select a gain that meets stability and response goals. It is a design aid, not a substitute for checking the full model and implementation.

**Worked root-locus example:** for $G(s)=1/(s+1)$ and proportional gain $K$, the characteristic equation gives $s=-(1+K)$. Increasing $K$ from 0 to 2 moves the pole from $-1$ to $-3\ \mathrm{s^{-1}}$.

**Book connection:** Ogata: stability, root-locus analysis and controller design by root locus.

Controller design starts with requirements such as rise time, overshoot, settling time, steady-state error, and disturbance rejection. Model the plant, select a controller, predict and simulate performance, then validate carefully at low power.

### Stability: External Response versus Internal Modes

A continuous-time finite-dimensional LTI state model is asymptotically stable when all eigenvalues of its state matrix have negative real parts. A reduced proper transfer function is BIBO stable when its poles have negative real parts. These statements differ when a pole-zero cancellation hides an internal mode. Cancelling an unstable pole algebraically is not a safe way to stabilise a plant.

A simple pole on the imaginary axis can produce a nondecaying free response and fail BIBO stability; repeated imaginary-axis modes can grow even with zero input. Do not classify all zero-real-part cases as harmless. For discrete-time asymptotic stability, poles must instead lie strictly inside the unit circle.

### Worked Routh and Root-Locus Example

Use the simulation plant $G_3(s)=1/[s(s+1)(s+2)]$ and positive proportional gain $K$. Unlike the first-order example, it has enough phase lag to become unstable at high gain.

**1. Component behaviour:** the integrator accumulates its input and the two lag blocks respond with their own time constants; these are specified model blocks rather than an unspecified physical circuit.

**2. Physical meaning:** delayed corrective action can reinforce motion instead of opposing it. The controller does not remove the states responsible for that delay.

**3. Topology:** negative unity feedback gives $1+KG_3=0$, or $s^3+3s^2+2s+K=0$.

**4. Prediction:** the Routh array is:

$$
\begin{array}{c|cc}
s^3 & 1 & 2\\
s^2 & 3 & K\\
s^1 & (6-K)/3 & 0\\
s^0 & K & 0
\end{array}
$$

All first-column entries are positive only for $0<K<6$. At $K=6$, the polynomial factors as $(s+3)(s^2+2)$: undamped modes occur at $\pm j\sqrt{2}$. For $K>6$, two first-column sign changes indicate two right-half-plane poles. Root locus shows their migration as gain increases.

**5. Reality check:** the $K=6$ boundary has no stability reserve. Delay and parameter error can move it; choose gain inside the stable range and check performance, rather than tuning to the boundary.

**6. Measurement:** compare simulated step traces at K=2 and K=8. Expect decaying transient at 2 and growing oscillation at 8; never reproduce the unstable test on hardware.

```matlab
laplaceVariable = tf('s');
thirdOrderPlant = 1/(laplaceVariable*(laplaceVariable+1) ...
    *(laplaceVariable+2));
figure; rlocus(thirdOrderPlant); grid on;
figure;
step(feedback(2*thirdOrderPlant, 1), ...
     feedback(8*thirdOrderPlant, 1), 20);
legend('K = 2: stable', 'K = 8: unstable'); grid on;
assert(all(real(roots([1 3 2 2])) < 0));
assert(sum(real(roots([1 3 2 8])) > 0) == 2);
```

### Frequency-Domain Design and Robustness

For $G(j\omega)=a+jb$, magnitude is $\sqrt{a^2+b^2}$ and phase is the complex argument, with quadrant taken into account. Use $20\log_{10}|G|$ for amplitude-ratio decibels. Every first-order pole contributes an eventual -20 dB/decade slope and up to -90 degrees of phase; a zero has the opposite tendency. A pure delay $e^{-sT_d}$ adds phase $-\omega T_d$ radians without changing magnitude.

The **gain crossover** $\omega_{gc}$ satisfies $|L(j\omega_{gc})|=1$. Phase margin is $180^\circ+\angle L(j\omega_{gc})$. At a **phase crossover** where phase is -180 degrees, gain margin is the reciprocal of the loop magnitude. These are loop quantities; closed-loop bandwidth is a different property of T. Multiple crossovers and unstable open-loop poles require fuller analysis, not a single margin number.

**Worked loop:** with $G=1/(s+1)$ and $C=2$, gain crossover is $\sqrt{3}=1.732\ \mathrm{rad/s}$. Phase there is -60 degrees, giving 120 degrees phase margin. There is no finite -180-degree crossing, so the ideal gain margin is infinite. A 0.2 s delay reduces phase margin by $1.732(0.2)(180/\pi)=19.85$ degrees. Infinite ideal gain margin does not mean immunity to delay or neglected dynamics.

```matlab
rcPlant = tf(1, [1 1]);
loopModel = 2*rcPlant;
figure; margin(loopModel); grid on;
[gainMargin, phaseMargin, phaseCross, gainCross] = margin(loopModel);
assert(isinf(gainMargin));
assert(abs(phaseMargin - 120) < 0.01);
assert(abs(gainCross - sqrt(3)) < 1e-3);
delayedLoop = loopModel;
delayedLoop.InputDelay = 0.2;
figure; margin(delayedLoop); grid on;
```

Practical design trades disturbance suppression at low frequencies against noise and unmodelled dynamics at high frequencies. Pick bandwidth below neglected resonances and account for sample/computation delay. Margins are diagnostics for the stated model, not universal safety certificates.

### Lead, Lag and Practical Derivative Action

| Element | Example | Intuition and limitation |
|---|---|---|
| Lead | $C_{lead}=(1+s)/(1+s/10)$ | Positive phase near the chosen crossover, but higher high-frequency gain can amplify noise |
| Lag | $C_{lag}=(s+1)/(s+0.1)$ | DC gain 10 and high-frequency gain 1; improves low-frequency gain but adds negative phase between its break frequencies |
| Filtered derivative | $C_D=K_d s/(1+s/\omega_f)$ | Approximates differentiation below $\omega_f$ and caps high-frequency gain at $K_d\omega_f$ |

For the lead example, maximum added phase is $\sin^{-1}[(10-1)/(10+1)]=54.90^\circ$ at $\sqrt{10}=3.162\ \mathrm{rad/s}$. This is the compensator's phase contribution, not a guaranteed 54.90-degree increase in the loop's phase margin: compensation also moves crossover. Recalculate the complete loop after changing C.

If D acts on measurement, use $u=K_p(r-y)+I-K_d\dot y_{filtered}$. A reference step then avoids derivative kick, but noise and sensor delay still matter. A first-order plant does not automatically benefit from D; controller complexity needs a performance reason.

### Nyquist as a Guided Extension

Nyquist checks how the full loop frequency response encircles -1, rather than inspecting only one Bode crossing. With a clockwise contour around the right-half-plane region, define N as net clockwise encirclements of -1, P as open-loop right-half-plane poles, and Z as closed-loop right-half-plane poles. Then $N=Z-P$. Stability requires $Z=0$; if P is nonzero, the required encirclements are not zero. Poles on the contour require indentation and special care.

For $L=2/(s+1)$, P=0 and there is no encirclement of -1, consistent with the stable closed-loop pole at -3. Draw `nyquist(loopModel)` and relate its closest approach to -1 to $|S|=1/|1+L|$. Consult Ogata's Nyquist criterion before applying the test to loops with imaginary-axis poles such as the preceding integrator example.

### State Space: Predicting Internal Behaviour

For $x=[v_C\ i_L]^T$ in a series RLC circuit with source voltage u and output $y=v_C$:

$$
\dot x=Ax+Bu,\qquad y=C_xx+D_xu,
$$

$$
A=\begin{bmatrix}0&1/C\\-1/L&-R/L\end{bmatrix},\quad
B=\begin{bmatrix}0\\1/L\end{bmatrix},\quad
C_x=\begin{bmatrix}1&0\end{bmatrix},\quad D_x=0.
$$

$C_x$ is the output matrix; C without a subscript is capacitance. State-space models retain initial stored energy directly, through $x(0)$, and allow multiple inputs/outputs. The transfer function follows from $G(s)=C_x(sI-A)^{-1}B+D_x$ for zero initial state.

**1. Component behaviour:** $\dot v_C=i_L/C$ and $\dot i_L=(u-Ri_L-v_C)/L$.

**2. Physical meaning:** the two states represent electric and magnetic energy, not two arbitrary curve-fitting coefficients.

**3. Topology:** the common series current couples the stores; output measures only capacitor voltage, while source voltage drives the inductor-current derivative.

**4. Prediction:** for the given RLC values, eigenvalues are $-500\pm j9987.49\ \mathrm{s^{-1}}$, agreeing with the damped resonance. With $v_C(0)=1$ V, $i_L(0)=0$ and u=0, current initially changes at -10 A/s while capacitor voltage initially has zero slope.

**5. Reality check:** controllability means the input can influence every state mode; observability means state modes can be inferred from the selected output over time. Neither guarantees good numerical conditioning or noise-resistant estimation. Hidden unstable modes cannot be ignored just because a simplified transfer function hides them.

**6. Measurement:** compare simulated capacitor voltage and inductor current, including a nonzero-initial-state response. A single measured output can reveal both modes over time in this model; it does not measure both states instantaneously.

The controllability matrix $[B\ AB]$ has determinant $-1/(CL^2)$, and the observability matrix $[C_x;C_xA]$ has determinant $1/C$. Both are nonzero for finite positive L and C, so this two-state model is controllable and observable.

```matlab
resistance = 100; inductance = 0.1; capacitance = 1e-7;
stateMatrix = [0 1/capacitance; -1/inductance -resistance/inductance];
inputMatrix = [0; 1/inductance];
outputMatrix = [1 0];
rlcStates = ss(stateMatrix, inputMatrix, outputMatrix, 0);
disp(eig(stateMatrix));
figure; initial(rlcStates, [1; 0], 0:1e-5:0.02); grid on;
assert(abs(det([inputMatrix stateMatrix*inputMatrix])) > 0);
assert(abs(det([outputMatrix; outputMatrix*stateMatrix])) > 0);
```

For motor states $[i\ \omega]^T$, the same construction gives $A=[-R/L, -K_e/L; K_t/J, -b/J]$, $B=[1/L;0]$ and speed output matrix $[0,1]$. This explains how an unmeasured electrical state can affect the measured mechanical response. State feedback and observers build on these concepts; designing them is an extension beyond the PI exercise below.

## Step 11: Account for Converters and Operating Points

### General Linearisation Before the Optional Converter Example

For $\dot x=f(x,u)$ and $y=g(x,u)$, first find an equilibrium $(x_0,u_0)$ satisfying $f(x_0,u_0)=0$. Define deviations $\hat x=x-x_0$, $\hat u=u-u_0$ and $\hat y=y-y_0$. To first order:

$$
\dot{\hat x}=A\hat x+B\hat u,\qquad
\hat y=C_x\hat x+D_x\hat u,
$$

where $A=\partial f/\partial x$, $B=\partial f/\partial u$, $C_x=\partial g/\partial x$ and $D_x=\partial g/\partial u$ are evaluated at the operating point. These derivatives describe local slopes, not global behaviour.

A voltage-dependent capacitance, speed-dependent friction or duty-dependent converter gain can require this treatment. Validate with both small and larger deviations to discover the model's useful range. The boost calculation below illustrates a **static** local slope only, not a dynamic state model or a build specification.

Converter models are nonlinear because duty ratio, current, and voltage interact. A control-oriented model often averages over switching cycles and is then linearized around one operating point. This approximation describes small changes near that point; larger duty, input, or load changes can make it inaccurate, and it does not predict switching ripple by itself.

**Worked boost linearisation:** for an ideal boost converter with $V_{IN}=3.3\ \mathrm{V}$ and operating duty $D_0=0.5$:

$$
V_{o0}=\frac{V_{IN}}{1-D_0}=6.6\ \mathrm{V},\qquad
\left.\frac{\partial V_o}{\partial D}\right|_{D_0}=\frac{V_{IN}}{(1-D_0)^2}=13.2\ \mathrm{V}
$$

A small duty change $\hat d=0.01$ predicts $\hat v_o\approx0.132\ \mathrm{V}$. This is a local estimate, not a full dynamic converter model. For a buck converter, the ideal $V_o\approx D V_{in}$ relationship is a steady-state CCM result; it is not by itself the plant model needed for feedback design.

**Book connection:** Ogata: operating points and linearisation of nonlinear models. The converter equation is supplied here as an optional application; neither named book is being presented as a complete converter-design reference.

## Step 12: Implement PI Control Digitally

A digital controller does not see a continuously changing signal: it samples every $T_s$ seconds and updates its output at those instants. The accumulated integral therefore depends on both the error and the sample period. One simple discrete PI implementation is:

$$
I[k]=I[k-1]+K_i e[k]T_s,\qquad u_{raw}[k]=K_p e[k]+I[k]
$$

The output command is limited to its allowed range. Sampling, ADC/PWM quantization, computation delay, sensor filtering, and noise make hardware behavior differ from a continuous model.

**Worked update:** let $K_p=2$, $K_i=5\ \mathrm{s^{-1}}$, $T_s=0.01\ \mathrm{s}$, $e[k]=0.4\ \mathrm{V}$, and $I[k-1]=0$. Then $I[k]=0.02\ \mathrm{V}$ and $u_{raw}=0.82\ \mathrm{V}$. On a 0–3.3 V command range this is about 24.8% duty.

**Windup check:** if $I[k-1]=3.2\ \mathrm{V}$ with the same positive error, the raw command becomes $4.02\ \mathrm{V}$ and is limited to $3.3\ \mathrm{V}$. Conditional integration pauses while the error pushes farther into saturation; integration resumes as the command returns to range.

**Book connection:** Ogata: PID design and implementation. Sampling, quantisation and the update algorithm here are self-contained practical extensions; discrete-time coverage depends on the edition and should not be assumed from the book title alone.

## Complete Design Exercise: Bounded RC Voltage Regulation

### Requirements and Model

Use the same $R=10\ \mathrm{k\Omega}$ and $C=100\ \mathrm{\mu F}$ plant, so $\tau=1$ s. In this **simulation-only** design, an ideal bounded actuator applies a continuous averaged voltage $u\in[0,3.3]$ V to the RC input. An ideal sensor measures capacitor voltage directly. A real GPIO has finite output resistance and PWM ripple and is not this ideal actuator.

Design for a step from 0 to **1 V**, with:

- Nominal overshoot below 5% of the reference change.
- Nominal 2% settling time below 3 s.
- Zero steady-state error to a reachable constant target in the stable unsaturated model.
- No clipping during the nominal step.
- Recovery from a simulated -0.2 V plant-input disturbance applied after settling.

The signed disturbance is a voltage added at the plant input: $\tau\dot y+y=u+d$. It is not automatically equivalent to changing the physical output load resistance.

### Derive the PI Controller

For $G=1/(\tau s+1)$ and $C_{PI}=K_p+K_i/s$, unity feedback gives:

$$
T(s)=\frac{K_p s+K_i}{\tau s^2+(1+K_p)s+K_i}.
$$

Matching the denominator with $s^2+2\zeta\omega_n s+\omega_n^2$ gives:

$$
K_p=2\zeta\omega_n\tau-1,\qquad K_i=\omega_n^2\tau.
$$

Choose $\zeta=1$ and $\omega_n=2\ \mathrm{rad/s}$: $K_p=3$ and $K_i=4\ \mathrm{s^{-1}}$. The closed-loop denominator is $(s+2)^2$, but the numerator zero at $-4/3$ means the output is **not** the standard zero-free critically damped response.

For a unit step with zero initial states, exact nominal responses are:

$$
y(t)=1+(t-1)e^{-2t},\qquad
e(t)=(1-t)e^{-2t},\qquad
u(t)=1+(2-t)e^{-2t},
$$

with numerical t in seconds and voltage responses in volts. Differentiating y gives $\dot y=(3-2t)e^{-2t}$: the peak occurs at 1.5 s, with $y_{peak}=1+0.5e^{-3}=1.02489$ V, or **2.49% overshoot**. The output stays inside the 2% band after approximately **1.91 s**. The command starts at 3 V and remains within 0-3.3 V. Merely matching a critically damped denominator would have missed the overshoot.

### Apply the Six-Step Reasoning Sequence

**1. Component behaviour:** $\tau\dot y=u+d-y$, $e=r-y$, $\dot I=K_i e$, and $u_{raw}=K_p e+I$.

**2. Physical meaning:** the capacitor stores physical energy; integral state I stores error history expressed as a voltage command. The source supplies the charge and resistor losses.

**3. Topology:** negative unity feedback returns y to the summing junction; actuator limiting lies before the plant. Disturbance d enters after the limit in this defined model.

**4. Prediction:** initial command is 3 V, initial capacitor voltage is zero, then y rises with slight zero-induced overshoot. A negative input disturbance makes output fall; integral action raises the sustaining command to 1.2 V to restore y=1 V.

**5. Reality check:** this model omits PWM ripple and sensor/source loading. A 3 V reference would request 9 V initially and saturate, so its response would not be the scaled nominal curve. A target above 3.3 V is unreachable even with unlimited integration.

**6. Measurement:** compare simulated reference, output, error and command, not output alone. Check peak, settling band and clipping. Repeat with $\tau=0.8$ and 1.2 s using the same gains; parameter variation is a robustness test, not a new tuning prescription.

### Continuous-Time MATLAB Checks

This block is independent of earlier snippets and requires Control System Toolbox. `stepinfo` uses the specified final value rather than estimating it from the last sample.

```matlab
plantTimeConstant = 1;
proportionalGain = 3;
integralGain = 4;
referenceVoltage = 1;
plantModel = tf(1, [plantTimeConstant 1]);
controllerModel = tf([proportionalGain integralGain], [1 0]);
trackingModel = feedback(controllerModel*plantModel, 1);
commandModel = feedback(controllerModel, plantModel);
disturbanceModel = feedback(plantModel, controllerModel);
simulationTime = (0:0.001:6)';
outputVoltage = squeeze(step(referenceVoltage*trackingModel, simulationTime));
commandVoltage = squeeze(step(referenceVoltage*commandModel, simulationTime));
metrics = stepinfo(outputVoltage, simulationTime, referenceVoltage, ...
    'SettlingTimeThreshold', 0.02, 'RiseTimeLimits', [0.1 0.9]);
assert(metrics.Overshoot < 5);
assert(metrics.SettlingTime < 3);
assert(all(commandVoltage >= 0 & commandVoltage <= 3.3));
assert(abs(dcgain(trackingModel) - 1) < 1e-10);
assert(abs(dcgain(disturbanceModel)) < 1e-10);
assert(max(abs(outputVoltage ...
    - (1 + (simulationTime-1).*exp(-2*simulationTime)))) < 1e-6);
tiledlayout(2, 1);
nexttile;
plot(simulationTime, outputVoltage); yline(referenceVoltage);
grid on; ylabel('Output (V)');
nexttile;
plot(simulationTime, commandVoltage); yline(3.3);
grid on; ylabel('Command (V)'); xlabel('Time (s)');
figure; hold on;
for variedTimeConstant = [0.8 1 1.2]
    variedPlant = tf(1, [variedTimeConstant 1]);
    step(feedback(controllerModel*variedPlant, 1), simulationTime);
end
grid on; legend('tau = 0.8 s', 'tau = 1 s', 'tau = 1.2 s');
```

The expected plots show a smooth output rise with a small peak, and a command that decreases from 3 V toward 1 V. The variation plot tests whether the selected performance limits survive model uncertainty; do not assume they do because the nominal case passes.

### Sampled Control, Hold and Delay

Choose $T_s=0.01$ s for illustration. This is small relative to the nominal 0.5 s pole time scale, but a ratio alone does not prove digital closed-loop stability. With constant command over each interval, the exact RC update is:

$$
y[k+1]=a y[k]+(1-a)(u[k]+d[k]),\qquad a=e^{-T_s/\tau}.
$$

For comparison, forward Euler gives $y[k+1]=(1-T_s/\tau)y[k]+(T_s/\tau)u[k]$. Its open-loop numerical pole lies inside the unit circle only when $0<T_s<2\tau$. Numerical integration stability is not the same test as closed-loop controller stability.

A zero-order hold keeps the command between samples. Computation and sensor delay add further lag. In MATLAB, `c2d(plantModel, samplePeriod, 'zoh')` discretises the plant with this hold; `c2d(controllerModel, samplePeriod, 'tustin')` gives a different PI approximation from the explicit update below. Check the poles of the resulting discrete feedback model rather than mixing continuous and discrete transfer functions.

### Anti-Windup and a Nonlinear Simulation

The following MATLAB-only block includes actuator bounds, an unreachable-reference interval, recovery and a disturbance. It computes a candidate integral update first. If that candidate drives saturation farther in the same error direction, it keeps the previous integral state and clips the command. If error drives the command back toward range, integration is permitted. This is conditional integration, not an assertion that clipping alone prevents windup.

```matlab
samplePeriod = 0.01;
plantTimeConstant = 1;
proportionalGain = 3;
integralGain = 4;
minimumCommand = 0;
maximumCommand = 3.3;
simulationTime = (0:samplePeriod:12)';
referenceVoltage = ones(size(simulationTime));
referenceVoltage(simulationTime >= 2 & simulationTime < 4) = 4;
inputDisturbance = zeros(size(simulationTime));
inputDisturbance(simulationTime >= 8) = -0.2;
outputVoltage = zeros(size(simulationTime));
commandVoltage = zeros(size(simulationTime));
integralHistory = zeros(size(simulationTime));
integralState = 0;
holdCoefficient = exp(-samplePeriod/plantTimeConstant);
for sampleIndex = 1:numel(simulationTime)-1
    voltageError = referenceVoltage(sampleIndex)-outputVoltage(sampleIndex);
    candidateIntegral = integralState + integralGain*samplePeriod*voltageError;
    candidateCommand = proportionalGain*voltageError + candidateIntegral;
    pushesUpperLimit = candidateCommand > maximumCommand && voltageError > 0;
    pushesLowerLimit = candidateCommand < minimumCommand && voltageError < 0;
    if ~(pushesUpperLimit || pushesLowerLimit)
        integralState = candidateIntegral;
    end
    rawCommand = proportionalGain*voltageError + integralState;
    commandVoltage(sampleIndex) = min(max(rawCommand, minimumCommand), maximumCommand);
    integralHistory(sampleIndex) = integralState;
    outputVoltage(sampleIndex+1) = holdCoefficient*outputVoltage(sampleIndex) ...
        + (1-holdCoefficient)*(commandVoltage(sampleIndex) ...
        + inputDisturbance(sampleIndex));
end
commandVoltage(end) = commandVoltage(end-1);
integralHistory(end) = integralState;
assert(all(commandVoltage >= minimumCommand & commandVoltage <= maximumCommand));
assert(abs(outputVoltage(end)-1) < 0.02);
tiledlayout(3, 1);
nexttile;
plot(simulationTime, [referenceVoltage outputVoltage]); grid on;
legend('Reference', 'Output'); ylabel('Voltage (V)');
nexttile;
plot(simulationTime, commandVoltage); grid on; ylabel('Command (V)');
nexttile;
plot(simulationTime, integralHistory); grid on;
ylabel('Integral contribution (V)'); xlabel('Time (s)');
```

Predict the three stages before running: the 4 V request is unattainable and produces upper saturation; returning to 1 V requires discharging the capacitor through the modelled circuit; after the -0.2 V disturbance, the sustaining command approaches 1.2 V. Remove the conditional-integration guard in a separate simulation and compare integral growth and recovery time. Do not reproduce the unreachable-reference experiment on an unvalidated hardware controller.

### Quantisation, Calibration and Design Acceptance

An ideal N-bit ADC over range $V_{FS}$ has code spacing approximately $V_{FS}/(2^N-1)$ when endpoints map to codes 0 and $2^N-1$. For 12 bits and 3.3 V this is about 0.806 mV. Real ADC effective resolution, calibration and linearity may be worse; ESP32 attenuation settings do not guarantee a precision 3.3 V full-scale converter.

A PWM duty step with N-bit endpoint scaling is $1/(2^N-1)$. At 8 bits and a 3.3 V pulse height, the ideal average-voltage step is 12.94 mV. This is not the output ripple: ripple also depends on period, filter and load. Sensor offsets can cause a PI loop to settle at the wrong physical voltage with zero **measured** error.

Use a design acceptance record:

| Check | Evidence to record | Reason to revise the design |
|---|---|---|
| Nominal tracking | Overshoot, settling band/time, final error | Response violates the stated limits |
| Command feasibility | Peak command and time in saturation | Ideal design requests unavailable actuation |
| Disturbance rejection | Initial deviation and recovery | Loop cannot restore a reachable target |
| Robustness | Same tests with changed plant parameters | Performance depends on an unrealistically exact model |
| Digital behaviour | Discrete poles, hold/update timing and bounded simulation | Delay or sampling changes stability/performance |
| Measurement validity | Sensor units, offset, noise and loading | Apparently correct output is a calibration artefact |

If a test fails, distinguish a bad model, an unreachable requirement and poor tuning. Increasing gain is only one possible response and often makes the last two problems worse.

## Practical Assumptions

The examples assume linear models, known parameters, and ideal sensors and actuators unless stated otherwise. Real systems add component tolerances, losses, measurement noise, sensor scaling, sampling delay, and actuator limits. Treat calculations as predictions to compare with data, not guaranteed hardware results.

## Textbook Reading Pointers

Use the following topics with the contents and index of your own editions. No page or chapter number is asserted without checking that edition. The broader course reading path is in [Textbook Resources](Textbook_Resources.md), but is not required to work through this review.

| Topic | Book sections to revisit |
|---|---|
| Physical circuit models | Alexander and Sadiku: circuit laws, energy storage, first-order and second-order circuits |
| Transforms and sinusoidal response | Alexander and Sadiku: Laplace transforms, sinusoidal steady state and frequency response; Ogata: mathematical modelling |
| Feedback and P/PI/PID | Ogata: feedback systems, transient response, steady-state error and PID controllers |
| Stability and gain selection | Ogata: Routh stability criterion and root-locus analysis/design |
| Robustness and compensation | Ogata: frequency-response analysis/design, Bode plots, Nyquist criterion, lead and lag compensation |
| Internal dynamics | Ogata: state-space modelling, controllability, observability and state-space design |
| Sampling, windup and converter application | Self-contained practical extensions here; check your edition's coverage rather than assuming dedicated sections |

## Self-Check

Attempt each question before opening its solution. Use calculations, a sketch and an explicit assumption where relevant.

### Core Review Exercises

1. For the RC example, find $\tau$ and output after one time constant for a 3.3 V step from zero.
2. Keep $\tau=1$ s, but start at 1 V and step the source to 3.3 V. Find output at 1 s. Why is the zero-state step formula insufficient?
3. For the RL example, find current at 10 ms and explain why doubling R changes both final current and time constant.
4. Classify the stated RLC example and calculate its damped frequency. What happens to damping if series resistance doubles?
5. For the motor model, calculate speed and current after a 1 V input settles with zero external load torque. Why does a speed-only first-order model miss the initial current transient?
6. For P control of the RC plant with $K_p=2$ and a 3.3 V reference, find final error and initial command. Which result exposes an actuator-limit problem?

??? note "Worked solutions: core review"

    1. $\tau=RC=1$ s, and $v_C(\tau)=3.3(1-e^{-1})=2.086$ V.

    2. $v_C(1)=3.3+(1-3.3)e^{-1}=2.454$ V. Stored initial charge contributes a zero-input response; a zero-initial-state transfer-function step alone omits it.

    3. $i(10\ \mathrm{ms})=0.1(1-e^{-1})=63.21$ mA. With R doubled, final current is 50 mA and $L/R=5$ ms. Less final stored energy does not imply a longer transient.

    4. $\zeta=0.05<1$, so it is underdamped. $f_d=9987.49/(2\pi)=1589.56$ Hz. Doubling R doubles $\zeta$ to 0.1, increases decay rate and slightly lowers damped frequency; L and C still set the undamped natural frequency.

    5. $\omega=0.05/(0.0045)=11.111$ rad/s, about 106.1 RPM, and $i=b\omega/K_t=0.2222$ A. The full model has a fast winding-current state; neglecting it approximates speed only after that fast mode has largely decayed.

    6. Final output is $(2/3)3.3=2.2$ V and error is 1.1 V. Initial command is $2(3.3)=6.6$ V: this exceeds a 3.3 V actuator, so the nominal linear transient cannot be applied unchanged.

### Analysis and Design Exercises

7. A divider returns $y/2$. What reference should the controller compare with it for a 2 V output target? What happens if it compares with 2 V instead?
8. For $G=1/(s+1)$ and $C=2$, find the output contribution from a constant +0.3 V disturbance at the plant input. How would an output-added disturbance differ?
9. For $L=(3s+4)/[s(s+1)]$, identify system type and unit-step/unit-ramp errors. State the required stability condition.
10. Use the Routh first column to classify $s^3+3s^2+2s+8$. Why is K=6 not a robust design?
11. For $L=2/(s+1)$, calculate crossover and phase margin, then the margin reduction from a 0.2 s delay.
12. Does the lead example's maximum phase contribution equal its improvement in loop phase margin? Explain what else changes.
13. For the RLC state model, find $\dot x(0)$ when $x(0)=[1\ 0]^T$ and u=0. Explain how capacitor-voltage measurements can reveal an initially unmeasured current state.

??? note "Worked solutions: analysis and design"

    7. Compare with 1 V. Comparing with 2 V instead requests a 4 V physical output when error tends to zero, potentially saturating a bounded actuator.

    8. $GS=1/(s+3)$ has DC gain 1/3, so the input disturbance adds 0.1 V to output. An output-added disturbance uses S, whose DC gain is also 1/3 here; the DC result happens to agree because $G(0)=1$, but the transient transfer functions differ.

    9. One uncancelled integrator gives type 1. Step error is zero; $K_{vel}=4$, so unit-ramp error is 0.25. The closed-loop poles must be stable and the reference achievable without sustained limiting for these ideal error results to hold.

    10. The first column is $1,3,-2/3,8$, giving two sign changes and two right-half-plane poles. At K=6 the pair is on the imaginary axis, leaving no asymptotic decay or robustness reserve.

    11. $\omega_{gc}=\sqrt{3}=1.732$ rad/s and $PM=120^\circ$. Delay adds -19.85 degrees there, reducing the margin to approximately 100.15 degrees for this loop.

    12. No. The compensator contributes up to 54.90 degrees at 3.162 rad/s, but its magnitude changes gain crossover. Recompute phase margin at the new crossover of the complete compensated loop.

    13. $\dot x(0)=[0,-10]^T$, with units V/s and A/s. Current changes capacitor-voltage slope; observing that time history can infer current under the model. Observability does not make a single voltage sample a direct current measurement.

### Implementation and Validation Exercises

14. The PI exercise has poles at -2 with repeated multiplicity. Why does its step still overshoot, and by how much?
15. At a 3 V reference, what initial ideal command would the same PI gains request? Why is the nominal scaled response no longer valid?
16. A -0.2 V input disturbance persists while target remains 1 V. What sustaining command is required? Would increasing integral gain make a 4 V target reachable?
17. Calculate ideal 12-bit ADC and 8-bit PWM average-voltage increments over 3.3 V. Why are these not accuracy or ripple specifications?
18. With $\tau=1$ s, what happens to forward-Euler plant integration at $T_s=2.5$ s? Does using the exact ZOH plant update automatically stabilise a sampled PI loop?
19. At $D_0=0.5$ and $V_{IN}=3.3$ V, compare the boost local prediction for $\hat d=0.01$ with the exact static voltage change. Why is neither a step-response model?

??? note "Worked solutions: implementation and validation"

    14. The numerator zero changes the response from the zero-free canonical model. At t=1.5 s, overshoot is $100(0.5e^{-3})=2.489$ percent. Pole damping alone does not specify the complete step waveform.

    15. $u(0^+)=K_p r=9$ V, beyond the 3.3 V bound. Saturation and integrator handling change the dynamics; use the nonlinear simulation.

    16. Equilibrium needs $u+d=y$, so $u=1.2$ V. No integral gain makes an output above the source/actuator capability reachable; it only changes accumulation and potentially windup.

    17. ADC spacing is $3.3/4095=0.806$ mV; PWM ideal average spacing is $3.3/255=12.94$ mV. Calibration, noise and nonlinearity affect accuracy, while PWM frequency, load and filtering determine ripple.

    18. Euler gives the discrete pole $1-2.5=-1.5$, outside the unit circle, so numerical states alternate and grow. Exact ZOH removes that open-loop integration error, but controller update, gain and delay still determine closed-loop stability.

    19. The local estimate is $13.2(0.01)=0.132$ V. Exact change is $3.3/0.49-6.6=0.134694$ V, about 2% above the local estimate. These are equilibrium values/slopes; neither contains dynamic energy-storage or transient information.

## Compact Reference

| Question | Relationship | Condition to remember |
|---|---|---|
| What sets an RC/RL time scale? | $RC$, $L/R$ | Use the resistance actually seen by the storage element |
| What sets second-order modes? | $s^2+2\zeta\omega_n s+\omega_n^2$ | Numerator zeros also affect measured transients |
| What is the feedback denominator? | $1+CGH$ | Sign and sensor scaling must match the actual loop |
| What suppresses disturbances? | $S=1/(1+L)$ | Include the disturbance's entry location |
| What transmits measurement noise? | T to output, CS to command | These formulas assume the stated unity-feedback arrangement |
| What is system type? | Number of uncancelled loop poles at zero | Controller name alone does not determine it |
| Where must stable poles lie? | Left half-plane continuously; inside unit circle discretely | Do not hide unstable internal modes by cancellation |
| What does anti-windup do? | Stops/reverses inappropriate integral accumulation | It cannot make an unreachable target reachable |

The review is complete when you can derive a model, explain the expected waveform without relying on its plot, design a controller against numerical requirements, and describe a measurement or simulation that would invalidate your assumptions.