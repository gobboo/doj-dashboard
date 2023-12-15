import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  strapi: {
    url: process.env.STRAPI_URL || 'http://localhost:1337',
    prefix: '/api',
    version: 'v4',
    cookie: {},
  },
  modules: ['@nuxtjs/tailwindcss', 'nuxt-icon'],
  build: {
    transpile: ['moment'],
  },
  buildModules: ['@pinia/nuxt', '@nuxtjs/strapi']
})
