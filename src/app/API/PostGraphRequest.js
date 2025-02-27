export const GraphRequest=[
    {
      "function": "/litellm/proxy/proxy_server.py:chat_completion",
      "params": [
        {
          "identifier": "request",
          "type": "Request"
        },
        {
          "identifier": "fastapi_response",
          "type": "Response"
        }
      ],
      "response_object": "",
      "children": [
        {
          "function": "/litellm/proxy/proxy_server.py:ProxyConfig.load_team_config",
          "params": [
            {
              "identifier": "self",
              "type": null
            },
            {
              "identifier": "team_id",
              "type": "str"
            }
          ],
          "response_object": "",
          "children": [
            {
              "function": "/litellm/proxy/proxy_server.py:ProxyConfig.get_config",
              "params": [
                {
                  "identifier": "self",
                  "type": null
                }
              ],
              "response_object": "dict",
              "children": [
                {
                  "function": "/litellm/proxy/utils.py:update_spend",
                  "params": [
                    {
                      "identifier": "prisma_client",
                      "type": "PrismaClient"
                    },
                    {
                      "identifier": "db_writer_client",
                      "type": "Optional[HTTPHandler]"
                    },
                    {
                      "identifier": "proxy_logging_obj",
                      "type": "ProxyLogging"
                    }
                  ],
                  "response_object": "",
                  "children": [
                    {
                      "function": "/litellm/proxy/utils.py:print_verbose",
                      "params": [
                        {
                          "identifier": "print_statement",
                          "type": null
                        }
                      ],
                      "response_object": "",
                      "children": []
                    }
                  ]
                }
              ]
            },
            {
              "function": "/litellm/proxy/utils.py:_is_valid_team_configs",
              "params": [],
              "response_object": "",
              "children": []
            }
          ]
        },
        {
          "function": "/litellm/proxy/proxy_server.py:parse_cache_control",
          "params": [
            {
              "identifier": "cache_control",
              "type": null
            }
          ],
          "response_object": "",
          "children": []
        },
        {
          "function": "/litellm/proxy/proxy_server.py:select_data_generator",
          "params": [
            {
              "identifier": "response",
              "type": null
            },
            {
              "identifier": "user_api_key_dict",
              "type": null
            }
          ],
          "response_object": "",
          "children": [
            {
              "function": "/litellm/proxy/proxy_server.py:async_data_generator",
              "params": [
                {
                  "identifier": "response",
                  "type": null
                },
                {
                  "identifier": "user_api_key_dict",
                  "type": null
                }
              ],
              "response_object": "",
              "children": [
                {
                  "function": "/litellm/proxy/utils.py:ProxyLogging.post_call_failure_hook",
                  "params": [
                    {
                      "identifier": "self",
                      "type": null
                    },
                    {
                      "identifier": "original_exception",
                      "type": "Exception"
                    },
                    {
                      "identifier": "user_api_key_dict",
                      "type": "UserAPIKeyAuth"
                    }
                  ],
                  "response_object": "",
                  "children": [
                    {
                      "function": "/litellm/proxy/utils.py:ProxyLogging.alerting_handler",
                      "params": [
                        {
                          "identifier": "self",
                          "type": null
                        },
                        {
                          "identifier": "message",
                          "type": "str"
                        },
                        {
                          "identifier": "level",
                          "type": "Literal[\"Low\", \"Medium\", \"High\"]"
                        },
                        {
                          "identifier": "alert_type",
                          "type": "Literal[\n            \"llm_exceptions\",\n            \"llm_too_slow\",\n            \"llm_requests_hanging\",\n            \"budget_alerts\",\n            \"db_exceptions\",\n        ]"
                        }
                      ],
                      "response_object": "",
                      "children": []
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          "function": "/litellm/proxy/utils.py:ProxyLogging.during_call_hook",
          "params": [
            {
              "identifier": "self",
              "type": null
            },
            {
              "identifier": "data",
              "type": "dict"
            },
            {
              "identifier": "user_api_key_dict",
              "type": "UserAPIKeyAuth"
            },
            {
              "identifier": "call_type",
              "type": "Literal[\n            \"completion\",\n            \"embeddings\",\n            \"image_generation\",\n            \"moderation\",\n            \"audio_transcription\",\n        ]"
            }
          ],
          "response_object": "",
          "children": []
        },
        {
          "function": "/litellm/proxy/utils.py:ProxyLogging.post_call_failure_hook",
          "params": [
            {
              "identifier": "self",
              "type": null
            },
            {
              "identifier": "original_exception",
              "type": "Exception"
            },
            {
              "identifier": "user_api_key_dict",
              "type": "UserAPIKeyAuth"
            }
          ],
          "response_object": "",
          "children": [
            {
              "function": "/litellm/proxy/utils.py:ProxyLogging.alerting_handler",
              "params": [
                {
                  "identifier": "self",
                  "type": null
                },
                {
                  "identifier": "message",
                  "type": "str"
                },
                {
                  "identifier": "level",
                  "type": "Literal[\"Low\", \"Medium\", \"High\"]"
                },
                {
                  "identifier": "alert_type",
                  "type": "Literal[\n            \"llm_exceptions\",\n            \"llm_too_slow\",\n            \"llm_requests_hanging\",\n            \"budget_alerts\",\n            \"db_exceptions\",\n        ]"
                }
              ],
              "response_object": "",
              "children": []
            }
          ]
        },
        {
          "function": "/litellm/proxy/utils.py:ProxyLogging.post_call_success_hook",
          "params": [
            {
              "identifier": "self",
              "type": null
            },
            {
              "identifier": "response",
              "type": "Union[ModelResponse, EmbeddingResponse, ImageResponse]"
            },
            {
              "identifier": "user_api_key_dict",
              "type": "UserAPIKeyAuth"
            }
          ],
          "response_object": "",
          "children": []
        },
        {
          "function": "/litellm/proxy/utils.py:ProxyLogging.pre_call_hook",
          "params": [
            {
              "identifier": "self",
              "type": null
            },
            {
              "identifier": "user_api_key_dict",
              "type": "UserAPIKeyAuth"
            },
            {
              "identifier": "data",
              "type": "dict"
            },
            {
              "identifier": "call_type",
              "type": "Literal[\n            \"completion\",\n            \"embeddings\",\n            \"image_generation\",\n            \"moderation\",\n            \"audio_transcription\",\n        ]"
            }
          ],
          "response_object": "",
          "children": [
            {
              "function": "/litellm/proxy/utils.py:print_verbose",
              "params": [
                {
                  "identifier": "print_statement",
                  "type": null
                }
              ],
              "response_object": "",
              "children": []
            }
          ]
        },
        {
          "function": "/litellm/proxy/utils.py:_is_valid_team_configs",
          "params": [],
          "response_object": "",
          "children": []
        },
        {
          "function": "/litellm/proxy/utils.py:_read_request_body",
          "params": [
            {
              "identifier": "request",
              "type": null
            }
          ],
          "response_object": "",
          "children": []
        }
      ]
    }
  ]

  