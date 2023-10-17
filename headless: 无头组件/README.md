# Headless in React

## 诞生契机
   **class 组件**：往往存在不相干的逻辑混杂在一起，或者一组相干的逻辑分散在不同的生命周期函数中，导致难以维护。

   **React Hooks**：通过 React Hooks，可以把组件的状态逻辑抽离成自定义 hooks，相干的逻辑放在一个 Hook 里，不相干的拆分成不同的 hook，最终在组件需要时引入，从而实现状态逻辑在不同组件之间复用。

## Headless的标准和定义
React中的Headless组件是指**只负责逻辑和数据的组件，在渲染方面没有具体的实现**，这样的组件可以被其他组件或者外部框架所使用，可以更好地实现**逻辑复用和解耦**。

Headless组件**没有具体的渲染输出**，而是将组件的状态以props(DOM、JSON等)的形式传递给使用该组件的其他组件或者框架，让其去渲染展示。在实际开发中，Headless组件可以通过多种方式实现，比如函数式组件和Class组件等。
在定义Headless组件时，需要遵循以下标准：

1. 只关注数据和逻辑，不关心渲染输出，不直接与DOM交互。即Headless组件不应该包含任何UI和样式代码，其职责是处理数据和业务逻辑，并向其他组件提供API接口和数据操作方法。
2. Headless UI应该是无状态组件，通常使用函数组件实现。
3. 通过props传递状态和函数，让组件变得灵活，易于集成。
4. 提供清晰的API，让其他组件或框架易于使用。 即应该具有明确的输入和输出，即声明它所接受的props和提供的方法。
5. Headless组件应该是可复用和可扩展的，可以方便地和其他UI组件或库集成。


在React中Headless组件的标准和定义与其他框架中类似，主要是指一种只提供业务逻辑和API接口，不包含UI和样式的无状态组件。通过使用Headless组件可以使应用程序更具可维护性、可扩展性和可复用性。

总结: 实现逻辑高复用性并支持UI高度定制化。

![alt headless](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9a767a14135a4e1ca22f660907d5754f~tplv-k3u1fbpfcp-zoom-in-crop-mark:4536:0:0:0.awebp)

从表象上来看，Headless UI 组件其实就是一个什么也不渲染的组件。
从实体上看，Headless UI 组件就是一个 React Hook。

```
import React from 'react';
import UIComponent from './UIComponent'; // 渲染dom的组件里面包含具体的标签以及样式
function HeadlessComponent(props) {
  const { data } = props;
  const processedData = processData(data);
  return <UIComponent data={processedData} />;
}
export default HeadlessComponent;
```


## Headless 不可以返回DOM吗？
**Headless组件的设计初衷是用来处理逻辑和状态而不与渲染输出直接交互。因此，Headless组件本身是没有具体的DOM输出的，返回的只是组件逻辑和状态。**
然而，作为一种灵活的设计模式，Headless组件在某些情况下也可以返回DOM部分，而不是将其直接渲染到页面上。例如，Headless组件可以使用返回的DOM作为参数，传递给其他组件或框架进行进一步的处理和渲染。
需要注意的是，如果Headless组件返回了具体的DOM，那么它就失去了Headless组件的设计初衷，这样做可能会增加代码耦合性和可维护性的难度。因此，在实现Headless组件时，我们仍应该尽可能遵循Headless组件的设计理念，只关注数据和逻辑。如果有必要，可以将Headless组件分解成更小的、更专注的子组件来实现具体的DOM输出。

```
function calculateTax(price, taxRate) {
  return price * (taxRate / 100)
}
function PriceDisplay({ price, taxRate }) {
  const tax = calculateTax(price, taxRate)
  const totalPrice = price + tax
  return (
    <div>
      <div>The original price is: ${price}</div>
      <div>The added tax is: ${tax}</div>
      <div>The total price is: ${totalPrice}</div>
    </div>
  )
}
```

这个组件确实有DOM元素作为输出。因此，从输出的角度来看，它并不是一个完全没有DOM元素渲染输出的headless组件。
但是，从headless组件的定义和特点来看，headless组件通常没有任何与视觉表现相关的渲染输出，主要负责数据处理和状态管理等逻辑功能。
实际上，headless 组件在生成 DOM 元素方面并没有限制，它们可以完全像 UI 组件一样生成 DOM 元素作为输出，只不过它们专注于提供业务逻辑和数据处理等功能，并不直接关注具体的 UI 表现形式。
headless 组件不会对具体的 UI 表现形式做出任何实际贡献，它们专注于业务逻辑和数据处理等功能，并不应该直接渲染具体的 UI 元素。最终的呈现效果，应该是由其他 UI 组件来完成的。

怎么解释上文中的“没有任何与视觉表现相关的渲染输出”?

headless组件通常只负责业务逻辑和数据处理逻辑，而不涉及到与视觉表现相关的问题，例如样式和布局等内容。headless组件的主要用途是将逻辑与可视化分离，使得逻辑更加清晰，可维护性更高。
通常情况下，headless组件不会直接生成DOM元素作为输出，而是通过返回数据或者回调函数等方式将业务逻辑传递给其他具有渲染能力的UI组件，由UI组件最终来渲染输出。
在上面的组件中，虽然它返回了div元素作为输出，但这些组件内部逻辑的一部分，并不涉及到任何具体的样式和布局问题。


## Headless只能是函数组件吗？
Headless组件的核心特征是只关注逻辑和数据而不关心渲染输出，因此不一定是函数组件。事实上，Headless组件既可以是函数组件，也可以是Class组件。
在React函数式组件中，组件的props和状态可以很方便地通过函数参数和闭包进行处理，这使得函数式组件非常适合作为Headless组件使用。但是，如果您需要更多的生命周期方法或状态管理方法，或者需要在组件之间共享状态和方法，那么Class组件可能更适合您的需求。
无论是函数组件还是Class组件，都可以使用Headless组件来实现逻辑复用和解耦。当然，需要注意的是，不管是函数组件还是Class组件，都需要遵循Headless组件的设计理念，即只关注逻辑和数据，而不关心具体的渲染输出。


## 自定义hook算headless组件？
是的，自定义 Hook 可以是 Headless 组件。事实上，大多数自定义 Hook 都是 Headless 组件，因为它们通常只关注逻辑和状态的处理，不涉及 UI 的渲染和交互。与其他 React 组件不同，Headless 组件仅关注功能而不关注其外观。它们不处理组件的渲染，返回值也传递的是数据和方法而不是渲染的 JSX 元素。与 UI 组件相比，Headless 组件更加通用、复用性更高。自定义 Hook 可以帮助我们抽象出公共逻辑，使我们能够在不同的组件中重用代码，并使 UI 组件更加清晰和简洁。在实现 Headless 组件时，我们通常需要把逻辑和状态管理放在自定义 Hook 中，把 UI 渲染放在 UI 组件中，通过组合这两个部分来实现功能更强大的组件。 因此，Headless 组件可以使用自定义 Hook 技术实现，并且自定义 Hook 可以为 Headless 组件提供更好的抽象和重用能力。

## 自定义hook它是headless组件但不是React组件
自定义 Hook 可以视作是 Headless 组件的一种实现形式，但它并不能被视为 React 组件。自定义 Hook 实际上是一个函数，它可以用来抽象出某一类组件所特有的共用逻辑，通常会用 use 前缀来命名，以便 React 可以识别出这是一个 Hook。 与组件不同，自定义 Hook 不会像普通的函数那样被直接调用，而是在组件中通过调用它来使用它，获取其中的数据和方法，从而实现逻辑和状态的共用。自定义 Hook 并不处理 UI 的渲染和交互，只关注逻辑和状态的处理，复用性很强。因此，自定义 Hook 也可以被视为 Headless 组件，但它并不是 React 组件。

从 React 视角来看，自定义 Hook 并不是组件，它仅仅是一个用于提供逻辑和状态管理的函数。在 React 中，只有函数组件和类组件才是组件，因为它们是可以被 React 渲染和在页面中展示的。而自定义 Hook 并没有 UI 渲染的功能，也不被 React 直接渲染到页面中，因此不能被视为组件。 虽然自定义 Hook 不是组件，但它是一种很好的抽象方式，可以解决函数组件之间无法直接共享状态和方法的问题，也可以简化代码。自定义 Hook 通常包含有状态数据、状态变更逻辑、和一些类似生命周期函数的副作用代码。这些逻辑可以帮助我们实现更加灵活、可维护性更强的代码，有效地解耦业务逻辑和 UI 渲染，使得代码更加干净和易读。因此，虽然自定义 Hook 不是 React 组件，但它可以让组件的开发变得更加高效和方便。

## demo

```
import React from "react";
// 定义work函数
const processUserData = (userData) => {
  const processedData = { ...userData };
  processedData.firstInitial = userData.firstName[0];
  processedData.lastInitial = userData.lastName[0];
  return processedData;
};
// 定义Headless组件
const UserHeadless = ({ userData, onUserDataProcessed }) => {
  const processedData = processUserData(userData);
  onUserDataProcessed(processedData)
  return null;
};
export { UserHeadless };
```

```
const UIComponent = () => {
  const [userData, setUserData] = useState({
    firstName: "John",
    lastName: "Doe",
  });
  
  // 处理userData的逻辑
  const onUserDataProcessed = (processedData) => {
    console.log(processedData);
  };
  return (
    <>
      <UserHeadless
        userData={userData}
        onUserDataProcessed={onUserDataProcessed}
      />
    </>
  );
};
export default UIComponent;
```
UserHeadless的业务逻辑和数据处理被传递给可视化组件App，可视化组件并不直接有关于这个组件的显示逻辑，仅处理这个组件返回的结果。

该组件中的UserHeadless是符合React Headless组件标准的。它只负责处理业务逻辑和数据处理，输出一些数据供其他组件使用。这个组件把props传递给userData并通过processUserData函数处理后返回，不涉及任何视图的渲染工作。组件中的onUserDataProcessed回调函数通过参数将处理后的数据传递给其他组件。

