# Rufus & Reina S2

Monogatari 기반 비주얼 노벨 게임입니다.

## GitHub Pages

배포 주소: https://legavin1023.github.io/rufus-reina-S2/

Node.js 24 이상과 Git을 설치하고, GitHub 저장소에 푸시할 수 있는 계정으로 인증합니다.

```powershell
# 최초 설치
npm install

# 웹 빌드 (결과: build/web)
npm run build:web

# 현재 로컬 게임을 빌드하고 GitHub Pages에 배포
npm run deploy
```

`deploy`는 `origin` 저장소의 `gh-pages` 브랜치에 웹 빌드 결과를 푸시합니다. 현재 작업 폴더의 수정 내용도 빌드에 포함됩니다. 소스 코드는 별도로 커밋하고 푸시해야 합니다.

저장소 **Settings → Pages → Build and deployment**에서 다음과 같이 한 번 설정합니다.

- Source: **Deploy from a branch**
- Branch: **gh-pages**, 폴더: **/(root)**

배포 후 GitHub Pages 반영에 몇 분이 걸릴 수 있습니다. `.nojekyll` 파일은 빌드 시 자동 생성됩니다.

Windows에서 Git이 `SSL certificate problem` 오류를 표시하면, 아래 명령어로 현재 PowerShell 세션에서 Windows 인증서 저장소를 사용한 뒤 배포합니다.

```powershell
$env:GIT_CONFIG_COUNT = '1'
$env:GIT_CONFIG_KEY_0 = 'http.sslBackend'
$env:GIT_CONFIG_VALUE_0 = 'schannel'
npm run deploy
```

이 저장소에 설정을 저장하려면 다음 명령어를 한 번 실행합니다. 이후에는 `npm run deploy`만 사용하면 됩니다.

```powershell
git config --local http.sslBackend schannel
```

### 명령어 오류 해결

- `Missing script: "buil"`: `npm run buil`은 오타입니다. 웹 빌드는 `npm run build:web`, 배포는 `npm run deploy`를 사용합니다.
- `npm run build` 실패: 이 명령어는 Yarn을 사용하는 Electron 데스크톱 빌드입니다. GitHub Pages 배포에는 `npm run deploy`를 사용합니다.
- `[MODULE_TYPELESS_PACKAGE_JSON]`: Node의 모듈 형식 경고입니다. 종료 코드가 0이면 웹 빌드는 성공한 것입니다.

공식 안내: [GitHub Pages 배포 소스 설정](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site)

## 로컬 개발

모바일에서는 **가로 전체화면 시작** 버튼을 터치하면 전체화면과 가로 방향 잠금을 요청합니다. 자동 회전이나 전체화면을 지원하지 않는 브라우저에서는 휴대폰을 직접 가로로 돌려 플레이합니다.

Bun이 설치되어 있으면 개발 서버를 실행할 수 있습니다.

```powershell
npm run serve
```

접속 주소: http://localhost:5100

## 데스크톱 빌드

기존 Electron 명령어는 Yarn이 필요합니다.

```powershell
npm run start
npm run build:windows
npm run build:mac
npm run build:linux
```
