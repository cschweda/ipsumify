<template>
  <v-app id="inspire" dark>
    <v-navigation-drawer clipped fixed v-model="drawer" app>
      <v-container grid-list-md text-xs-center class="mt-3">
        <v-layout row wrap>
          <v-flex xs12>
            <v-btn color="error" @click.stop="emitRegenerateEvent" class="big">Generate</v-btn>
          </v-flex>
          <v-flex xs12 class="mt-3 pt-3" style="border-top: 1px solid #888; ">

            <v-btn color="info" @click="showText('markdown')" class="btn-display">Markdown</v-btn>
            <v-btn color="info" @click="showText('html-rendered')" class="btn-display">HTML</v-btn>
            <v-btn color="info" @click="showText('html-raw')" class="btn-display">Raw HTML</v-btn>
            <v-btn color="info" @click="showText('raw')" class="btn-display">Raw Text</v-btn>
            <v-btn color="info" @click="copyToClipboard" class="mt-5">Copy to clipboard</v-btn>

          </v-flex>
          <v-flex xs12 class="mt-3 pt-3" style="border-top: 1px solid #888; ">

          </v-flex>
        </v-layout>
      </v-container>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left justify-center>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>ipsumify.me</v-toolbar-title>
    </v-toolbar>
    <v-content>
      <router-view style="padding-bottom: 30px"></router-view>
    </v-content>
    <v-footer app fixed>
      <v-layout row wrap justify-center>
        <span>Footer text here</span>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>
  import { EventBus } from './event-bus.js';
  export default {
    data: () => ({
      drawer: true,
      textType: 'markdown'
    }),
    methods: {
      emitRegenerateEvent: function () {
        EventBus.$emit('regenerate');

      },
      copyToClipboard: function () {
        EventBus.$emit('clipboard');

      },
      showText: function (val) {
        EventBus.$emit('display', val);
        console.log(val)
      }
    },
    props: {
      source: String
    }
  }
</script>


<style>
  body {
    font-size: 24px;
  }

  .toolbar__title {
    font-family: 'Special Elite', cursive;
    font-weight: bold;
    font-size: 40px;
    color: red;
  }


  footer {
    font-size: 14px;
  }

  .btn-display {
    width: 100px;
    font-size: 12px;
  }

  .big {
    font-size: 20px;
    font-weight: bold;

  }
</style>