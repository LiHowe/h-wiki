# Mermaid

markdown 流程图绘制库， `typora`内置支持该markdown代码块功能

[在线编辑器](https://mermaid-js.github.io/mermaid-live-editor/edit#eyJjb2RlIjoiZ3JhcGggVERcbiAgICBBW0hhcmRdIC0tPnxUZXh0fCBCKFJvdW5kKVxuICAgIEIgLS0-IEN7RGVjaXNpb259XG4gICAgQyAtLT58T25lfCBEW1Jlc3VsdCAxXVxuICAgIEMgLS0-fFR3b3wgRVtSZXN1bHQgMl0iLCJtZXJtYWlkIjoie1xuICBcInRoZW1lXCI6IFwiZGVmYXVsdFwiXG59IiwidXBkYXRlRWRpdG9yIjpmYWxzZSwiYXV0b1N5bmMiOnRydWUsInVwZGF0ZURpYWdyYW0iOnRydWV9)

## 功能

代码块为`mermaid`, 比如
<pre>
```mermaid
flowchart LR
  c --> aa
  aa --> bb
```
</pre>

### FlowChart - 流程图

```mermaid:pure
flowchart LR
  c --> aa
  aa --> bb
```

```mermaid
flowchart LR
  c --> aa
  aa --> bb
```

### Sequence Diagram - 时序图

```mermaid
sequenceDiagram
    Alice->>John: Hello John, how are you?
    John-->>Alice: Great!
    Alice-)John: See you later!
```

### Class Diagram - 类图

```mermaid
classDiagram
      Animal <|-- Duck
      Animal <|-- Fish
      Animal <|-- Zebra
      Animal : +int age
      Animal : +String gender
      Animal: +isMammal()
      Animal: +mate()
      class Duck{
          +String beakColor
          +swim()
          +quack()
      }
      class Fish{
          -int sizeInFeet
          -canEat()
      }
      class Zebra{
          +bool is_wild
          +run()
      }

```

### State Diagrams - 状态图

```mermaid
stateDiagram-v2
    [*] --> Still
    Still --> [*]

    Still --> Moving
    Moving --> Still
    Moving --> Crash
    Crash --> [*]
```

### User Journey Diagrams - 用户旅程图

```mermaid
journey
    title My working day
    section Go to work
      Make tea: 5: Me
      Go upstairs: 3: Me
      Do work: 1: Me, Cat
    section Go home
      Go downstairs: 5: Me
      Sit down: 5: Me

```

### Pie Chart Diagrams - 饼图

```mermaid
pie title Pets adopted by volunteers
    "Dogs" : 386
    "Cats" : 85
    "Rats" : 15
    "c" : 10
    "d" : 20
    "e" : 20
    "f" : 20
    "g" : 20
``` 

### Gantt Diagrams - 甘特图

```mermaid
gantt
  dateFormat  YYYY-MM-DD
  title       Adding GANTT diagram functionality to mermaid
  excludes    weekends

  section A section
  Completed task            :done,    des1, 2014-01-06,2014-01-08
  Active task               :active,  des2, 2014-01-09, 3d
  Future task               :         des3, after des2, 5d
  Future task2              :         des4, after des3, 5d
 
  section Critical tasks
  Completed task in the critical line :crit, done, 2014-01-06,24h
  Implement parser and jison          :crit, done, after des1, 2d
  Create tests for parser             :crit, active, 3d
  Future task in critical line        :crit, 5d
  Create tests for renderer           :2d
  Add to mermaid                      :1d
  Functionality added                 :milestone, 2014-01-25, 0d

  section Documentation
  Describe gantt syntax               :active, a1, after des1, 3d
  Add gantt diagram to demo page      :after a1  , 20h
  Add another diagram to demo page    :doc1, after a1  , 48h

  section Last section
  Describe gantt syntax               :after doc1, 3d
  Add gantt diagram to demo page      :20h
  Add another diagram to demo page    :48h

```


### Requirement Diagrams - 需求图

```mermaid
requirementDiagram

    requirement test_req {
    id: 1
    text: the test text.
    risk: high
    verifymethod: test
    }

    element test_entity {
    type: simulation
    }

    test_entity - satisfies -> test_req
```

## 配置

我们可以通过配置`mermaid.initialize(config)`方法中的config来配置全局图表的样式

你可以在这里找到全部的配置项 -> [Mermaid官网 - 全部配置项](https://mermaid-js.github.io/mermaid/#/./Setup?id=mermaidapi-configuration-defaults)

你也可以使用[Mermaid在线编辑器](https://mermaid.live/edit#eyJjb2RlIjoiZ3JhcGggTFJcbiAgICB0aGVtZSA9PT4gdChuZXV0cmFsKVxuICAiLCJtZXJtYWlkIjoie1xuICBcInRoZW1lXCI6IFwibnVsbFwiXG59IiwidXBkYXRlRWRpdG9yIjpmYWxzZSwiYXV0b1N5bmMiOnRydWUsInVwZGF0ZURpYWdyYW0iOmZhbHNlfQ)进行配置项测试

### `theme`

主题, 可选值为

+ `default`

  ![image-20211119141618219](https://i.loli.net/2021/11/19/ozQw5FTRJM8B7bO.png)

+ `forest`

  ![image-20211119141643427](https://i.loli.net/2021/11/19/FVWH3drTEqjQMbU.png)

+ `dark`

  ![image-20211119141657461](https://i.loli.net/2021/11/19/fDw6SxBWstp1X3F.png)

+ `neutral`

  ![image-20211119141829798](https://i.loli.net/2021/11/19/rG9KhmL6PEOZ7vB.png)

+ `base`

  ![image-20211119165646707](https://i.loli.net/2021/11/19/3OUho1KayAYgER9.png)

+ `null`

  禁用所有预设主题



