<template>
  <v-app id="inspire" dark>
    <v-snackbar :timeout="timeout" :top="y === 'top'" :bottom="y === 'bottom'" :right="x === 'right'" :left="x === 'left'" :multi-line="mode === 'multi-line'"
      :vertical="mode === 'vertical'" v-model="snackbar" style="font-size: 20px; font-weight: 400; color: red; text-transform: uppercase;">
      {{snackbarText}}
      <!-- <v-btn flat color="pink" @click.native="snackbar = false">Close</v-btn> -->
    </v-snackbar>
    <v-navigation-drawer clipped fixed v-model="drawer" app>
      <v-container grid-list-md text-xs-center class="mt-3">
        <v-layout row wrap>
          <v-flex xs12 class="hidden-md-and-up">
            <v-btn color="error" @click.stop="emitRegenerateEvent" style="margin-right: 5px;" class="btn-display">Generate</v-btn>
            <v-btn color="error" @click="copyToClipboard" class="btn-display">Copy</v-btn>
          </v-flex>
          <v-flex xs12 class="mt-1 pt-1">

            <v-btn color="info" @click="showText('markdown')" class="btn-display">Markdown</v-btn>
            <v-btn color="info" @click="showText('html')" class="btn-display">HTML</v-btn>
            <v-btn color="info" @click="showText('raw html')" class="btn-display">Raw HTML</v-btn>
            <v-btn color="info" @click="showText('raw text')" class="btn-display">Raw Text</v-btn>


          </v-flex>
          <v-flex xs12>
            <div class="mode">{{mode}}</div>
          </v-flex>
        </v-layout>
      </v-container>
    </v-navigation-drawer>
    <v-toolbar app fixed clipped-left justify-center>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <router-link to="/" class="nav-title">
        <v-toolbar-title>ipsumify.me</v-toolbar-title>
      </router-link>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">

        <v-btn color="info" @click.stop="emitRegenerateEvent" style="margin-right: 5px;">Generate Lorum Ipsum</v-btn>
        <v-btn color="info" @click="copyToClipboard">Copy</v-btn>
      </v-toolbar-items>
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
      textType: 'markdown',
      y: 'top',
      x: null,
      mode: '',
      snackbar: false,
      timeout: 1500,
      snackbarText: 'Hello',
      mode: 'Markdown'

    }),
    mounted() {
      EventBus.$on('clipboard-success', () => {
        this.snackbarText = 'Copied to Clipboard'
        this.snackbar = true;
      });
      EventBus.$on('regenerate-success', () => {
        this.snackbarText = 'Lorum Ipsum Regenerated'
        this.snackbar = true;
      });

      EventBus.$on('mode', (mode) => {
        this.mode = mode;
      });

    },
    computed: {

    },
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

  .nav-title {
    text-decoration: none;
  }

  .nav-title:hover {
    color: #aaa;
  }

  .mode {
    font-size: 14px;
    font-weight: 900;
    text-transform: uppercase;

  }
</style>