<template>
  <div>
    <v-container grid-list-md class="mt-2">
      <v-layout row wrap>
        <v-flex xs12>

          <div v-if="mode === 'markdown'">
            <pre class="clipboard">{{markdown}}</pre>
          </div>
          <div v-else-if="mode === 'html-raw'">
            <pre class="clipboard">{{renderedMarkdown }}</pre>
          </div>
          <div v-else-if="mode === 'html-rendered'">
            <div v-html="renderedMarkdown" class="clipboard"></div>
          </div>
          <div v-else-if="mode === 'raw'">
            <pre class="clipboard">{{rawText}}</pre>
          </div>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  import { EventBus } from '../event-bus.js';
  const loremIpsum = require('lorem-ipsum')
  const renderedMarkdown = require('markdown-it')();
  const markdownItAttrs = require('markdown-it-attrs');
  const markdownItNamedHeadings = require('markdown-it-named-headings');
  renderedMarkdown.use(markdownItAttrs);
  renderedMarkdown.use(markdownItNamedHeadings);

  export default {
    name: 'HelloWorld',
    mounted() {
      this.generateIpsum();
      EventBus.$on('regenerate', () => {
        this.generateIpsum();

      });
      EventBus.$on('clipboard', () => {
        this.copyToClipboard();

      });
      EventBus.$on('display', (mode) => {
        //this.generateIpsum();
        this.mode = mode;
        console.log(mode)

      });
    },
    filters: {

    },

    computed: {

      renderedMarkdown: function () {
        return renderedMarkdown.render(this.markdown)
      },
      rawText: function () {

        return this.renderedMarkdown.replace(/(<([^>]+)>)/ig, "");
      }
    },
    methods: {
      generateIpsum() {

        this.generatePattern();
        this.parsePattern();


      },
      copyToClipboard() {
        console.log('Copy to clipboard');
        let textToCopy = '';

        if (this.mode != 'html-raw') {
          textToCopy = document.querySelector('.clipboard').innerHTML
        } else {
          textToCopy = renderedMarkdown.render(this.markdown);
        }
        console.log(textToCopy)
        this.$copyText(textToCopy).then(function (e) {
        }, function (e) {

          console.log(e)
        })
      },
      generateParagraph(ub) {
        let lb = (ub / 2);
        let ipsum = loremIpsum({
          count: 10, units: 'sentences', sentenceLowerBound: lb, sentenceUpperBound: ub
        });
        return `\r\n${ipsum}\r\n`;

      },
      generateHeading(lvl) {

        let ipsum = loremIpsum({
          count: 1
        });
        let heading = '';
        for (let i = 0; i < lvl; i++) {
          heading = heading + "#"
        }
        console.log(heading)
        return `\r\n${heading} ${ipsum}\r\n`;

      },
      generateParagraphWithImage(pos) {
        let position;
        let ipsum1 = loremIpsum({
          count: 10, units: 'sentences', sentenceLowerBound: 5, sentenceUpperBound: 10
        });
        let ipsum2 = loremIpsum({
          count: 10, units: 'sentences', sentenceLowerBound: 15, sentenceUpperBound: 20
        });

        (pos === 'r') ? position = 'right' : position = 'left'

        return `\r\n${ipsum1}![My Image](http://via.placeholder.com/350x250){.float-${position}}${ipsum2}\r\n`


      },
      generatePattern: function () {
        return this.pattern = 'h1-p17-p14-p17-h2-p18-ir'
      },
      parsePattern: function () {
        let patternArray = this.pattern.split('-')
        let markdown = '';
        patternArray.forEach((el, idx) => {
          let element = el.charAt(0);
          let action = el.substr(1, el.length - 1);

          switch (element) {
            case 'p':
              markdown = markdown + this.generateParagraph(action);
              break;
            case 'i':
              markdown = markdown + this.generateParagraphWithImage(action);
              break;
            case 'h':
              markdown = markdown + this.generateHeading(action);
              break;
            default:
              break;
          }
        })
        this.markdown = markdown

      }
    },
    data() {
      return {
        markdown: '',

        pattern: '',
        mode: 'markdown'

      }
    }
  }
</script>


<style>
  pre {

    white-space: pre-wrap;
    /* css-3 */
    white-space: -moz-pre-wrap;
    /* Mozilla, since 1999 */
    white-space: -pre-wrap;
    /* Opera 4-6 */
    white-space: -o-pre-wrap;
    /* Opera 7 */
    word-wrap: break-word;
    /* Internet Explorer 5.5+ */
  }

  .float-right {
    float: right;
    padding-left: 10px;
    padding-top: 5px;
  }

  .float-left {
    float: left;
    padding-right: 10px;
    padding-top: 5px;
  }
</style>