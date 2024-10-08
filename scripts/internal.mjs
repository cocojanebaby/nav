// Copyright @ 2018-present x.iejiahe. All rights reserved. MIT license.
// See https://github.com/xjh22222228/nav

import fs from 'fs'
import path from 'path'
import dayjs from 'dayjs'

const dbPath = path.join('.', 'data', 'db.json')
const internalPath = path.join('.', 'data', 'internal.json')
const settingsPath = path.join('.', 'data', 'settings.json')
const tagPath = path.join('.', 'data', 'tag.json')
const searchPath = path.join('.', 'data', 'search.json')

let internal = {}
let db = []
let settings = {}
let tags = []
let search = []
try {
  db = JSON.parse(fs.readFileSync(dbPath).toString() || '[]')
  internal = JSON.parse(fs.readFileSync(internalPath).toString() || '{}')
  settings = JSON.parse(fs.readFileSync(settingsPath).toString() || '{}')
  tags = JSON.parse(fs.readFileSync(tagPath).toString() || '[]')
  search = JSON.parse(fs.readFileSync(searchPath).toString() || '[]')
} catch (error) {
  console.log('parse JSON: ', error.message)
}

{
  if (!search.length) {
    search = [
      {
        name: '站内',
        icon: 'https://cdn.jsdelivr.net/gh/xjh22222228/public@gh-pages/nav/logo.svg',
        placeholder: '站内搜索',
        blocked: false,
        isInner: true,
      },
      {
        name: '百度',
        url: 'https://www.baidu.com/s?wd=',
        icon: 'https://cdn.jsdelivr.net/gh/xjh22222228/nav-web@image/baidu.svg',
        placeholder: '百度一下',
        blocked: false,
        isInner: false,
      },
      {
        name: 'Google',
        url: 'https://www.google.com/search?q=',
        icon: 'https://cdn.jsdelivr.net/gh/xjh22222228/nav-web@image/google.svg',
        blocked: false,
        isInner: false,
      },
      {
        name: '必应',
        url: 'https://cn.bing.com/search?q=',
        icon: 'https://cdn.jsdelivr.net/gh/xjh22222228/nav-web@image/bing.svg',
        blocked: false,
        isInner: false,
      },
      {
        name: 'GitHub',
        url: 'https://github.com/search?q=',
        icon: 'https://cdn.jsdelivr.net/gh/xjh22222228/nav-web@image/github.svg',
        placeholder: 'Search GitHub',
        blocked: false,
        isInner: false,
      },
      {
        name: '知乎',
        url: 'https://www.zhihu.com/search?type=content&q=',
        icon: 'https://cdn.jsdelivr.net/gh/xjh22222228/nav-web@image/zhihu.svg',
        blocked: false,
        isInner: false,
      },
      {
        name: '豆瓣',
        url: 'https://search.douban.com/book/subject_search?search_text=',
        icon: 'https://cdn.jsdelivr.net/gh/xjh22222228/nav-web@image/douban.svg',
        placeholder: '书名、作者、ISBN',
        blocked: false,
        isInner: false,
      },
    ]
    fs.writeFileSync(searchPath, JSON.stringify(search), {
      encoding: 'utf-8',
    })
  }
}

const TAG_ID1 = -1
const TAG_ID2 = -2
const TAG_ID3 = -3
const TAG_ID_NAME1 = '中文'
const TAG_ID_NAME2 = '英文'
const TAG_ID_NAME3 = 'Github'
{
  if (!Array.isArray(tags)) {
    tags = []
  }
  const a = tags.some((item) => item.id === TAG_ID1)
  if (!a) {
    tags.push({
      id: TAG_ID1,
      name: '中文',
      color: '#2db7f5',
      createdAt: '',
      desc: '系统内置不可删除',
      isInner: true,
    })
  }
  const b = tags.some((item) => item.id === TAG_ID2)
  if (!b) {
    tags.push({
      id: TAG_ID2,
      name: '英文',
      color: '#f50',
      createdAt: '',
      desc: '系统内置不可删除',
      isInner: true,
    })
  }
  const c = tags.some((item) => item.id === TAG_ID3)
  if (!c) {
    tags.push({
      id: TAG_ID3,
      name: 'Github',
      color: '#108ee9',
      createdAt: '',
      desc: '系统内置不可删除',
      isInner: true,
    })
  }
  tags = tags.filter((item) => item.name && item.id)
  fs.writeFileSync(tagPath, JSON.stringify(tags), {
    encoding: 'utf-8',
  })
}

{
  const banner1 =
    'https://cdn.jsdelivr.net/gh/xjh22222228/public@gh-pages/nav/banner1.jpg'
  const banner2 =
    'https://cdn.jsdelivr.net/gh/xjh22222228/public@gh-pages/nav/banner2.jpg'
  const backgroundImg =
    'https://cdn.jsdelivr.net/gh/xjh22222228/public@gh-pages/nav/background.jpg'

  settings.favicon ??=
    'https://cdn.jsdelivr.net/gh/xjh22222228/public@gh-pages/nav/logo.svg'
  settings.language ||= 'zh-CN'
  settings.loading ??= 'random'
  settings.allowCollect ??= true
  settings.email ||= ''
  settings.showGithub ??= true
  settings.showLanguage ??= true
  settings.showRate ??= true
  settings.title ??= '发现导航 - 精选实用导航网站'
  settings.description ??= '发现导航是一个轻量级免费且强大的导航网站'
  settings.keywords ??= '免费导航,开源导航'
  settings.theme ??= 'Light'
  settings.actionUrl ??= ''
  settings.appTheme ??= 'App'
  settings.openSEO ??= true
  settings.headerContent ??= ''
  settings.footerContent ??=
    '<div>共收录${total}个网站</div><div>Copyright © 2018-${year} ${hostname}, All Rights Reserved</div>'
  settings.showThemeToggle ??= true
  settings.lightCardStyle ||= 'standard'
  settings.lightOverType ||= 'overflow'
  settings.lightFooterHTML ||= ''
  settings.simThemeImages ||= [
    {
      src: banner1,
      url: '',
      width: null,
      height: null,
    },
    {
      src: banner2,
      url: '',
      width: null,
      height: null,
    },
  ]
  settings.simThemeDesc ??=
    '这里收录多达 <b>${total}</b> 个优质网站， 助您工作、学习和生活'
  settings.simCardStyle ||= 'standard'
  settings.simOverType ||= 'overflow'
  settings.simThemeHeight ??= 0
  settings.simThemeAutoplay ??= true
  settings.simTitle ||= ''
  settings.simFooterHTML ||= ''
  settings.superCardStyle ||= 'column'
  settings.superOverType ||= 'overflow'
  settings.superFooterHTML ||= ''
  settings.checkUrl ??= false
  settings.superTitle ??= ''
  const defImgs = [
    {
      src: 'https://cdn.jsdelivr.net/gh/xjh22222228/nav-web@image/nav-1717494364392-ad.jpg',
      url: 'https://haokawx.lot-ml.com/Product/index/454266',
    },
    {
      src: 'https://cdn.jsdelivr.net/gh/xjh22222228/public@gh-pages/img/10.png',
      url: '',
    },
  ]
  settings.superImages ??= defImgs
  settings.lightImages ??= defImgs
  if (!Array.isArray(settings.superImages)) {
    settings.superImages = defImgs
  }
  if (!Array.isArray(settings.lightImages)) {
    settings.lightImages = defImgs
  }
  settings.sideTitle ||= ''
  settings.sideCardStyle ||= 'example'
  settings.sideFooterHTML ||= ''
  settings.sideThemeHeight ??= 0
  settings.sideThemeAutoplay ??= true
  settings.sideCollapsed ??= false
  settings.sideThemeImages ||= [
    {
      src: banner2,
      url: '',
      width: null,
      height: null,
    },
    {
      src: banner1,
      url: '',
      width: null,
      height: null,
    },
  ]
  settings.shortcutTitle ??= ''
  settings.shortcutDockCount ??= 6
  settings.shortcutThemeShowWeather ??= true
  settings.shortcutThemeImages ??= [
    {
      src: backgroundImg,
      url: '',
      width: null,
      height: null,
    },
  ]
  settings.mirrorList ||= []
  settings.spiderIcon ??= 'NO'
  settings.spiderDescription ??= 'NO'
  settings.spiderTitle ??= 'NO'
  settings.spiderQty ??= 200
  settings.spiderTimeout ??= 6
  settings.spiderTimeout = Number(settings.spiderTimeout) || 6
  settings.loadingCode ??= ''

  settings.appCardStyle ??= 'common'
  fs.writeFileSync(settingsPath, JSON.stringify(settings), {
    encoding: 'utf-8',
  })
}

// 统计网站数量
export function getWebCount(websiteList) {
  // 用户查看所有数量
  let userViewCount = 0
  // 登陆者统计所有数量
  let loginViewCount = 0
  let diffCount = 0
  function r(nav) {
    if (!Array.isArray(nav)) return

    for (let i = 0; i < nav.length; i++) {
      const item = nav[i]
      if (item.url) {
        loginViewCount += 1
        userViewCount += 1
      } else {
        r(item.nav)
      }
    }
  }
  function r2(nav, ownVisible) {
    if (!Array.isArray(nav)) return

    for (let i = 0; i < nav.length; i++) {
      const item = nav[i]
      if (item.ownVisible) {
        r2(item.nav, true)
      } else {
        r2(item.nav, ownVisible)
      }

      if (item.url && item.ownVisible && !ownVisible) {
        diffCount += 1
      } else if (item.url && ownVisible) {
        diffCount += 1
      }
    }
  }
  r(websiteList)
  r2(websiteList)
  return {
    userViewCount: userViewCount - diffCount,
    loginViewCount,
  }
}

const { userViewCount, loginViewCount } = getWebCount(db)
internal.userViewCount = userViewCount < 0 ? loginViewCount : userViewCount
internal.loginViewCount = loginViewCount
internal.buildTime = Date.now()
fs.writeFileSync(internalPath, JSON.stringify(internal), { encoding: 'utf-8' })

// 设置网站的面包屑类目显示
let id = 0 // 为每个网站设置唯一ID
function setWeb(nav) {
  if (!Array.isArray(nav)) return

  function removeIconFont(item) {
    item.icon ||= ''
    if (typeof item.icon === 'string' && item.icon.startsWith('icon')) {
      item.icon = ''
    }
  }

  function formatDate(item) {
    item.createdAt ||= Date.now()
    item.createdAt = dayjs(item.createdAt).format('YYYY-MM-DD HH:mm:ss')
  }

  for (let i = 0; i < nav.length; i++) {
    const item = nav[i]
    removeIconFont(item)
    formatDate(item)
    if (item.nav) {
      for (let j = 0; j < item.nav.length; j++) {
        const navItem = item.nav[j]
        removeIconFont(navItem)
        formatDate(navItem)
        if (navItem.nav) {
          for (let k = 0; k < navItem.nav.length; k++) {
            const navItemItem = navItem.nav[k]
            removeIconFont(navItemItem)
            formatDate(navItemItem)

            navItemItem.nav.sort((a, b) => {
              const aIdx = a.index == null || a.index === '' ? 100000 : a.index
              const bIdx = b.index == null || b.index === '' ? 100000 : b.index
              return aIdx - bIdx
            })
            if (navItemItem.nav) {
              for (let l = 0; l < navItemItem.nav.length; l++) {
                let breadcrumb = []
                const webItem = navItemItem.nav[l]
                formatDate(webItem)
                breadcrumb.push(item.title, navItem.title, navItemItem.title)
                breadcrumb = breadcrumb.filter(Boolean)
                webItem.breadcrumb = breadcrumb
                webItem.id = id += 1

                // 新字段补充
                webItem.urls ||= {}
                webItem.rate ??= 5
                webItem.top ??= false
                webItem.ownVisible ??= false
                webItem.name ||= ''
                webItem.desc ||= ''
                webItem.icon ||= ''

                webItem.name = webItem.name.replace(/<b>|<\/b>/g, '')
                webItem.desc = webItem.desc.replace(/<b>|<\/b>/g, '')

                delete webItem.__desc__
                delete webItem.__name__

                // 节省空间
                if (!webItem.top) {
                  delete webItem.top
                }
                if (!webItem.ownVisible) {
                  delete webItem.ownVisible
                }

                // 兼容现有标签,以id为key
                for (let k in webItem.urls) {
                  if (k === TAG_ID_NAME1) {
                    webItem.urls[TAG_ID1] = webItem.urls[k]
                    delete webItem.urls[TAG_ID_NAME1]
                  }
                  if (k === TAG_ID_NAME2) {
                    webItem.urls[TAG_ID2] = webItem.urls[k]
                    delete webItem.urls[TAG_ID_NAME2]
                  }
                  if (k === TAG_ID_NAME3) {
                    webItem.urls[TAG_ID3] = webItem.urls[k]
                    delete webItem.urls[TAG_ID_NAME3]
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  return nav
}
const data = setWeb(db)
fs.writeFileSync(dbPath, JSON.stringify(data), { encoding: 'utf-8' })
