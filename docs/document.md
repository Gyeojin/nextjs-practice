react: library
ㄴ내가 활용하는 것
next.js: framework
ㄴ내가 주도권이 없고, 프레임워크가 주도권이 있다.
ㄴ프레임워크의 규칙을 준수해야 한다.

---

app/page.tsx -> 규정사항 1. 페이지는 반드시 이 위치에 있어야 한다.
app/layout.tsx -> 규정사항 2. layout은 자동생성된다.
router는 파일 시스템에 의해 자동으로 정해진다.

/ -> app/page.tsx(root page)
/abut-us -> app/about-us/page.tsx
/not-found -> app/not-found.tsx(404 page): 전역에서 적용됨.

use client; :

- CSR(Client Side Rendering) : 클라이언트(브라우저)에서 랜더링이 일어난다. 랜더링 -> code를 브라우저가 이해할 수 있는 html로 바꾸는 것.
  ㄴjavascript 파일을 전부 다운받은 후에야 랜더링(=UI building)이 일어나기 때문에 초기 로딩 속도가 느릴 수 있다.(javascript 활성화가 안 된 사용자일 경우 페이지 자체를 보는 것이 불가능.)
  ㄴSEO(검색엔진최적화)에 불리하다.
- SSR(Server Side Rendering) : 서버에서 랜더링이 일어난다. javasciprt 파일을 모두 다운받기 전에 html을 볼 수 있다.
  ㄴ초기 로딩 속도가 빠르다.
  ㄴ이미 서버에서 랜더링한 html을 브라우저 request에 대한 response로 보내주게 된다.

-hydration(수화) : SSR로 랜더링된 html이 브라우저에 도착한 후, 자바스크립트 파일이 모두 다운받아지면, 자바스크립트가 html을 장악하게 된다. 이 과정을 수화라고 한다. 수화가 완료된 후에는 react application이 된다.
/about-us ----------> 단순 HTML --------> init react application(단순 HTML) ------>interactive react

use client; 가 붙은 컴포넌트는 CSR로 랜더링된다.
ㄴ백엔드에서 랜더링되고 프론트에서 hydration된다는 의미.
ㄴ사용자(브라우저)는 use client javascript만 다운받기 때문에, 페이지 로딩 등이 향상된다.

layout
ㄴnext.js는 먼저 layout을 랜더링한 후, 그 안에 page를 랜더링한다.
ㄴurl을 찾아 해당 페이지를 넣는다.
ㄴlayout은 중첩이 가능하다.

router group
ㄴ라우팅에 영향을 미치지 않는 폴더
ㄴ괄호로 묶으면 url을 생성하지 않는다.

metadata
ㄴ메타데이터는 중첩이 아닌 병합이다.
ㄴ각 페이지에서 metadata를 설정할 수 있다.
ㄴpage나 layout에서만 metadata를 설정할 수 있다.
ㄴ메타데이터 템플릿도 만들 수 있음.

dynamic routes
ㄴ파일 시스템으로 핸들링.
ㄴ동적 라우팅을 위해서 [] -> 내부에 원하는 변수를 집어넣는 것으로 생성.
ㄴ내부에 page.tsx가 있으면 next.js는 그 파일을 읽는다.
ex:
export default function MovieDetail(props: ScriptProps) {
console.log(props);
return <h1>Movie Detail Page</h1>;
}
-> props는 { params: { id: string }, searchParams: {} } 형태로 들어온다.

data fetching
ㄴ백엔드에서 fetching 하고, Next.js는 해당 데이터를 캐싱한다.
ㄴ브라우저 network에서 요청하는 값이 없음. (백엔드에서 미리 부르고 데이터만 전달)

```
  // 'use client';
  const API_URL = 'https://nomad-movies.nomadcoders.workers.dev/movies';

  async function getMovies() {
    const response = await fetch(API_URL);
    const json = await response.json();
    return json;
  }

  export default async function HomePage() {
    const movies = await getMovies();
    return <div>{JSON.stringify(movies)}</div>;
  }
```

ㄴ이 경우에도 로딩은 존재하는데, 가령 페이지 최초 진입 시 백엔드에서 data fetching이 늦을 경우 사용자는 아예 페이지 진입조차 못 할 수 있다.
😎 http streaming
: 일반적으로 서버 렌더링은 아래와 같은 과정으로 진행된다.

1. 주어진 페이지의 모든 데이터를 서버에서 가져온다.
2. 서버가 페이지의 HTML을 렌더링.
3. 페이지의 HTML, CSS, 자바스크립트를 클라이언트로 보낸다.
4. 비상호작용 UI가 생성된 HTML과 CSS를 사용하여 표시한다.
5. React가 UI를 상호작용 가능하도록 하이드레이트(hydrate).
   Next.js의 서버 렌더링 방식은 클라이언트 렌더링 방식의 한계인 초기 로딩을 줄여주는데, 위의 과정에서 알 수 있듯이 여전히 최소한의 파일(초기 HTML, CSS)는 모두 가져와야 화면이 렌더링된다. (페이지 진입이 안 된 것 처럼 사용자에게 보일 수 있음.)
   이러한 방식은 스트리밍이 포함된 서버 렌더링으로 크게 개선될 수 있다.
   스트리밍을 사용하면 페이지의 HTML을 더 작은 청크로 나누고, 이 청크들을 서버에서 클라이언트로 점진적으로 전송이 가능하다. 이를 통해 모든 데이터를 로드하기 전에 페이지의 일부를 더 빨리 표시할 수 있다.
