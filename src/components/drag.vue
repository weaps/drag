<template>
  <div class="container">
    <h1>{{ msg }}</h1>
    <div style="height:200px"></div>
    <div class="row">
      <div class="col-lg-6" v-for="(team,tindex) in teamDataArr" :key="tindex">
        <div :class="['header', [team.teamName === 'B队' ? 'right-header' : 'left-header']]">
          <ul class="flex">
            <li>#</li>
            <li>姓名</li>
            <li>手机号</li>
          </ul>
        </div>
        <ul class="list-group">
          <li
            :class="['list-group-item flex',{'active': item.id === currentClassId[item.id] || item.id === currentClassId[item.id]}]"
            v-for="(item,cindex) in team.children"
            :key="cindex"
            :data-id="tindex+'-'+cindex"
            draggable="true"
            @dragstart="onDragstart($event)"
            @dragend="onDragend($event, item, cindex, team.teamName, tindex)"
            @dragover="onDragover($event)"
            @drop="onDrop($event)"
          >
            <span>{{item.id}}</span>
            <span>{{item.name}}</span>
            <span>{{item.mobile}}</span>
          </li>
        </ul>
      </div>
    </div>
    <div style="height: 1000px"></div>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Hello World',
      startExchangeIndex: '',
      endExchangeIndex: '',
      currentClassId: {},
      teamDataArr: [
        {
          teamName: 'A队',
          children: [
            {
              id: 1,
              name: 'aaa',
              mobile: '18012345678'
            },
            {
              id: 2,
              name: 'bbb',
              mobile: '18112345678'
            },
            {
              id: 3,
              name: 'ccc',
              mobile: '18212345678'
            },
            {
              id: 4,
              name: 'ddd',
              mobile: '18312345678'
            },
            {
              id: 5,
              name: 'eee',
              mobile: '18412345678'
            }
          ]
        },
        {
          teamName: 'B队',
          children: [
            {
              id: 6,
              name: 'fff',
              mobile: '18512345678'
            },
            {
              id: 7,
              name: 'ggg',
              mobile: '18612345678'
            },
            {
              id: 8,
              name: 'hhh',
              mobile: '18712345678'
            },
            {
              id: 9,
              name: 'iii',
              mobile: '18812345678'
            },
            {
              id: 10,
              name: 'jjj',
              mobile: '18912345678'
            }
          ]
        }
      ] 
    }
  },
  methods: {
    coveringHeadArea(event, data, index, name, tindex) {
      console.log(event, data, index, name, tindex);
      // 获取当前触发的元素类名
      let el = name === 'A队' ? '.right-header' : '.left-header',
          originIndex = name === 'A队' ? 1 : 0,
          // 获取当前元素的坐标信息
          domRect = document.querySelector(el).getBoundingClientRect()
      if (event.clientX > domRect.x && event.clientX < (domRect.x + domRect.width) && event.clientY > domRect.y && event.clientY < (domRect.y + domRect.height)) {
        // 删除原数据的item项
        this.currentClassId = {}
        this.teamDataArr[tindex].children.splice(index, 1)
        // 将删除项添加到目标数据中
        this.teamDataArr[originIndex].children.push(data)
        this.currentClassId[data.id] = data.id
        return false
      } else {
        console.log('无效区域');
        return false
      }
    },
    onDragstart (event) {
      this.startExchangeIndex = event.target.getAttribute('data-id')
      console.log('拖拽开始')
    },
    onDragend (event, data, index, name, tindex) {
      let startTeamIndex = parseInt(this.startExchangeIndex.split('-')[0])
      let startMemberIndex = parseInt(this.startExchangeIndex.split('-')[1])
      if (!this.endExchangeIndex) {
        // 勾股定理，判断当前是否将元素拖拽到了头部区域
        // 2种交互方式，1） 直接数据交换，2）元素拖拽到头部区域，将元素插入到当前列表中
        this.coveringHeadArea(event, data, index, name, tindex)
      } else {
        this.currentClassId = {}
        let endTeamIndex = parseInt(this.endExchangeIndex.split('-')[0])
        let endMemberIndex = parseInt(this.endExchangeIndex.split('-')[1])
        // 源数据
        let origin = {
          id: this.teamDataArr[endTeamIndex].children[endMemberIndex].id,
          name: this.teamDataArr[endTeamIndex].children[endMemberIndex].name,
          mobile: this.teamDataArr[endTeamIndex].children[endMemberIndex].mobile
        }
        // 目录数据
        let target = {
          id: this.teamDataArr[startTeamIndex].children[startMemberIndex].id,
          name: this.teamDataArr[startTeamIndex].children[startMemberIndex].name,
          mobile: this.teamDataArr[startTeamIndex].children[startMemberIndex].mobile
        }
        // 数据交换
        this.$set(this.teamDataArr[startTeamIndex].children, startMemberIndex, origin)
        this.$set(this.teamDataArr[endTeamIndex].children, endMemberIndex, target)
        // currentClassId 通过id，用于高亮显示
        this.currentClassId[origin.id] = origin.id
        this.currentClassId[target.id] = target.id
        // 数据交互完毕后，将目标值置空
        this.endExchangeIndex = ''
      }
      
    },
    onDrop (event) {
      if (event.target.className == 'list-group-item flex') {
        this.endExchangeIndex = event.target.getAttribute('data-id')
      } else {
        this.endExchangeIndex = event.target.parentElement.getAttribute('data-id')
      }
    },
    onDragover(event){
      // 阻止元素的默认行为，不然ondrop不管用
      event.preventDefault();
    }
  },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
ul,li {
  padding: 0;
  margin: 0;
  list-style-type: none;
}
.team {
  float: left;
  border: 1px solid black;
  margin-right: 20px;
}
.flex {
  display: flex;
  & > * {
    flex: 1;
    padding: .75rem 1.2rem;
  }
}
.header {
  background: #eee;
  li {
    font-weight: bold;
  }
}
.list-group-item {
  &:hover {
    cursor: move;
  }
}
</style>