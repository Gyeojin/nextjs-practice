## Suspence

- 컴포넌트가 준비되지 않았을 때(주로 데이터 로딩-비동기 호출) 렌더링을 하지 않고 props로 넘겨준 fallback UI를 대신 보여준다.

```
  <Suspense fallback={<h1>Loading Movie Info...</h1>}>
    <MovieInfo id={id} />
  </Suspense>
```

- 내부적으로 Promise throw 메커니즘을 사용.

1. 컴포넌트 렌더링 중
2. 아직 준비되지 않은 리소스 발견
3. Promise를 throw
4. 가장 가까운 Suspense 경계가 이를 캐치
5. Promise가 resolve 될 때까지 fallback 렌더링
6. resolve 후 → 다시 렌더링 시도

- Suspense의 장점

1. 전체 페이지 로딩을 방지한다. (부분 로딩이 가능)
2. UX의 세밀한 제어가 가능하다.
