#!/bin/bash
set -o xtrace
ip=$(kubectl get ingress | grep "shop-ingress" | grep -o '[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}\.[0-9]\{1,3\}')
echo $ip
REACT_APP_BACK_END_SERVER_IP=$ip yarn start
