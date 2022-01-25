---
categories:
  - backend
  - nestjs
titleSlug: ''
title: 名称&对象解释
thumbnail: ''
description: 暂无
wip: true
top: false
---
# NestJS名词和对象解释

## Controller

控制器, 负责处理传入的请求和向客户端返回响应。

## Service

服务, 供`Controller`调用, 为其提供数据

## Interface

## Provider

提供者, NestJS的基本概念, 是一类`Nest Class`的统称, 是一个使用`@Injectable()`装饰器注释的类.

`Service`, `Repository`, `Factory`, `Helper`

## Module

模块, 对应一个业务模块, 其中包含业务模块的Controller, Service, Entity

## Entity

## DTO (Data Transfer Object)

数据传输对象, 用于与前端交互时传输的对象, 只包含业务需要字段

## DAO (Data Access Object)

数据访问对象, 对象字段数量基本上与数据库表字段保持一致

## Pipe

## Filter

## Middleware

## Interceptor

## Guard

## Repository
