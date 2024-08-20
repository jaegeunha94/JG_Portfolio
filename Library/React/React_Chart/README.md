# React Chart Library Research
## SVG vs Canvas
- **Canvas**
  - 대규모 요소가 있는 차트(예: 히트 맵, 지리적 또는 평행 좌표)에 적합
  - 시각적 효과가 뛰어남

- **SVG**
  - 메모리 사용량이 적고 확대 시 흐릿하지 않음
  - 모바일 디바이스에 이점

## React 버전 호환성 조사
- React v.16 부터 내부 구조 업데이트 완료
- D3 - ES6 모듈 시스템과 호환

# D3 기반 차트 라이브러리
## Recharts
- 설치 실패 (deasync 라이브러리와 충돌)
- React component syntax 기반
- GitHub Stars: 19K+
- npm downloads: 1.1M+
- MIT License

## Victory
- 설치 후 모듈 충돌 발생
- D3 기반, SVG 지원
- GitHub Stars: 10K+
- npm downloads: 175K+
- 개발: Formidable Labs

## PatternFly
- 설치 가능, 처리 속도 느림
- Victory 기반, SVG 지원
- Threshold chart 기능 제공

## EJ2 React
- React 18 이상 지원
- 모든 차트에 Threshold 제공
- 자체 개발 차트 라이브러리

## Nvio
- React 18 버전의 함수 사용 (ReactDOM.render())
- D3 기반, SVG, Canvas, HTML 지원
- 애니메이션: React Motion

## ECharts
- Apache에서 개발
- Vanilla JavaScript syntax, ref로 컨트롤
- SVG와 Canvas 지원
- GitHub Stars: 54K+
- npm downloads: 458K+
- 렌더링 속도 빠름

## Visx
- airbnb 팀에서 제작
- D3 기반
- [GitHub 페이지](https://github.com/airbnb/visx)
