'use strict';

import React, { Component } from 'react';

import {StyleSheet} from 'react-native';

import {
  ViroARScene,
  ViroText,
  ViroConstants,
  ViroBox,
  ViroDirectionalLight,
  ViroAmbientLight,
  ViroMaterials,
  ViroARPlaneSelector,
  ViroQuad,
  Viro3DObject,
  ViroPortal,
  ViroPortalScene,
  Viro360Image,
} from 'react-viro';

export default class HelloWorldSceneAR extends Component {

  constructor() {
    super();

    // Set initial state here
    this.state = {
      text : "Initializing AR..."
    };

    // bind 'this' to functions
    this._onInitialized = this._onInitialized.bind(this);
  }

  planeSelector = React.createRef();

  /* Axis Quick Reference: */
  // Viro used 'Right Hand' coordinate system
  // Y vertical
  // X horizontal (left/right)
  // Z horizontal (forward/back)

  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onInitialized} >
      <ViroAmbientLight color='#fff' />
        <ViroDirectionalLight
          intensity={3000}
          color="#ffffff"
          direction={[-5, -2, -1]}
        />
        <ViroARPlaneSelector ref={this.planeSelector}>
            {/* PORTAL */}
            <ViroPortalScene
                passable={true}
                dragType='FixedDistance'
                onDrag={() => {}}>
              <ViroPortal scale={[0.25, 0.25, 0.25]} 
                position={[.1, -.1, -.1]}>
                <Viro3DObject
                  source={require("./res/portal_wood_frame.vrx")}
                  resources={[
                    require("./res/portal_wood_frame_diffuse.png"),
                    require("./res/portal_wood_frame_normal.png"),
                    require("./res/portal_wood_frame_specular.png")
                  ]}
                  type="VRX"
                />
              </ViroPortal>
              <Viro360Image source={require("./res/guadalupe_360.jpg")} />
            </ViroPortalScene>
            {/* BOXES */}
            <ViroBox
              onClick={() =>
                this.planeSelector.current.reset()
              }
              dragType="FixedToWorld"
              onDrag={() => {}}
              materials={["box_red"]}
              scale={[0.5, 0.5, 0.5]}
              position={[0, -1, -4]}
              physicsBody={{
                type: "Dynamic",
                mass: 1
              }}
            />
            <ViroBox
              dragType="FixedToWorld"
              onDrag={() => {}}
              materials={["box_green"]}
              scale={[0.5, 0.5, 0.5]}
              position={[0, -1, -4]}
              physicsBody={{
                type: "Dynamic",
                mass: 1
              }}
            />
            <ViroBox
              dragType="FixedToWorld"
              onDrag={() => {}}
              materials={["box_blue"]}
              scale={[0.5, 0.5, 0.5]}
              position={[0, 0, -4]}
              physicsBody={{
                type: "Dynamic",
                mass: 1
              }}
            />
            <ViroQuad materials={['quad']} rotation={[-90,0,0]} position={[0,-3,-1]} height={15} width={15} physicsBody={{type: 'Static'}}/>
        </ViroARPlaneSelector>
        <ViroText 
          text={this.state.text} 
          scale={[.5, .5, .5]} // Indicates half meter wide, half meter tall, and half meter deep
          position={[0, .5, -2]} // Indicates object is 2 meters in front of camera/view
          style={styles.helloWorldTextStyle} />
      </ViroARScene>
    );
  }

  _onInitialized(state, reason) {
    if (state == ViroConstants.TRACKING_NORMAL) {
      this.setState({
        text : "Hello World! Welcome to Chain React 2019"
      });
    } else if (state == ViroConstants.TRACKING_NONE) {
      // Handle loss of tracking
    }
  }
}

var styles = StyleSheet.create({
  helloWorldTextStyle: {
    fontFamily: 'Arial',
    fontSize: 15,
    color: '#ffffff',
    textAlignVertical: 'center',
    textAlign: 'center',  
  },
});

ViroMaterials.createMaterials({
  box_red: {
    shininess: 5.0,
    diffuseColor: "red",
    lightingModel: "Blinn"
  },
  box_green: {
    shininess: 5.0,
    diffuseColor: "green",
    lightingModel: "Blinn"
  },
  box_blue: {
    shininess: 5.0,
    diffuseColor: "blue",
    lightingModel: "Blinn"
  },
  quad: {
    diffuseColor: "rgba(0,0,0,0.02)"
  }
});

module.exports = HelloWorldSceneAR;
