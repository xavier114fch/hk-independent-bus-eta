import React, { useContext, useEffect } from 'react'
import AppContext from '../AppContext'
import { makeStyles } from '@material-ui/core/styles'
import { FixedSizeList } from 'react-window'
import memorize from 'memoize-one'
import RouteInputPad from './route-board/RouteInputPad'
import RouteRow from './route-board/RouteRow'
import { useTranslation } from 'react-i18next'
import { setSeoHeader } from '../utils'

const createItemData = memorize((routeList) => ({routeList}))

const RouteList = () => {
  const { AppTitle, db: {routeList}, searchRoute } = useContext ( AppContext )
  const targetRouteList = Object.entries(routeList).filter(
    ([routeNo, {stops, co}]) => routeNo.startsWith(searchRoute.toUpperCase()) && 
      (stops[co[0]] == null || stops[co[0]].length > 0)
  )
  const { t, i18n } = useTranslation()
  const classes = useStyles()

  useEffect(() => {
    setSeoHeader ({
      title: t('搜尋') + ' - ' + t(AppTitle),
      description: t('route-board-page-description'),
      lang: i18n.language
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const itemData = createItemData(targetRouteList)

  return (
    <FixedSizeList
      height={330}
      itemCount={targetRouteList.length}
      itemSize={56}
      width="100%"
      itemData={itemData}
      className={classes.root}
    >
        {RouteRow}
    </FixedSizeList>
  )
}

const RouteBoard = () => {
  return (
    <>
      <RouteList />
      <RouteInputPad />
    </>
  )
}

export default RouteBoard

const useStyles = makeStyles(theme => ({
  root: {
    background: theme.palette.type === 'dark' ? theme.palette.background.default : 'white', 
  },
  prerenderList: {
    height: '330px',
    overflowY: 'scroll',
    '& a': {
      textDecoration: 'none'
    }
  }
}))