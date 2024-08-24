# LabelsVisible 옵션

## 예시 코드
```
const outln = new mxOutline(this.graph, this.outline)

outln.outline.labelsVisible = true
```

* labelsVisible 속성은 다이어그램에 표시되는 노드나 엣지의 레이블이 개요 창에도 표시될지 여부를 결정
* true로 설정하면 다이어그램의 노드나 엣지에 있는 텍스트 레이블이 개요 창에도 나타난다. 
* 반대로 false로 설정하면 개요 창에는 레이블이 표시되지 않는다.
* 이 옵션으로 미니맵의 이동 속도가 개선되는 것을 확인할 수 있다.